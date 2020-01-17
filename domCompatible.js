/*
 * @Description: 封装浏览器兼容性写法
 * @version: 1.0.1
 * @Author: lxw
 * @Date: 2020-01-17 16:45:37
 * @LastEditors  : lxw
 * @LastEditTime : 2020-01-17 17:29:59
 */

const $lxw = (function () {
    // 根据id获取dom节点兼容写法--考虑到ie8以下存在一个bug--参考：MDN
    function getEle(nodeString) {
        // 正则表达式对象
        const regs = {
            id: /^#+/,
            class: /^\.+/,
            //TODO:可继续扩展
        }
        // 与正则表达式对象相互映射的处理函数对象
        const funs = {
            id: function getById(nStr) {
                // 调用对应的模块，暂时写在这里，感觉比独立出来写方便一些
                let ele = document.querySelector(nStr) || document.getElementById(nStr)
                // getElementById在ie8以下浏览器存在的一个bug
                if (isIE()) {
                    let eles = document.all[nStr]
                    let len = eles.length
                    for (let i = 0; i < len; i++) {
                        if (eles[i].id === nStr) {
                            return eles[i]
                        }

                    }
                } else {
                    return ele
                }
            },
            //TODO:可继续扩展
        }

        // 判断当前查询dom元素的字符串是id还是class还是元素
        for (const key in regs) {
            if (regs.hasOwnProperty(key)) {
                const element = regs[key];
                if (element.test(nodeString)) {
                    return funs[key](nodeString)
                }
            }
        }
    }

    // 判断是狗是ie浏览器
    function isIE() { //ie?
        if (!!window.ActiveXObject || "ActiveXObject" in window) { return true; }
        else { return false; }
    }


    //dom节点绑定事件兼容方法
    function addEleEvent(eleObj, eventName, handler) {
        if (eleObj.addEventListener) { // chrome、ff、ie111
            eleObj.addEventListener(eventName, handler, false)
        } else {
            eleObj.attachEvent('on' + eventName, function () {
                handler.call(obj) // 在ie7、8、9、10下，this指向window，使用call使得this指向当前dom对象
            })
        }
    }

    // dom节点移除事件函数兼容方法
    function removeHandler(eleObj, eventName, handler) {
        if (eleObj.removeEventListener) {
            eleObj.removeEventListener(eventName, handler, false)
        } else {
            eleObj.detachEvent('on' + eventName, function () {
                fn.call(eleObj)
            })
        }
    }


     // innerText兼容性写法
     function getInnerText(eleObj){
        return (typeof eleObj.textContent === 'string') ? eleObj.textContent : eleObj.innerText
    }
    function setInnerText(eleObj,text){
        if (typeof eleObj.textContent === 'string') {
            eleObj.textContent  = text
        } else {
            eleObj.innerText = text
        }
    }


    // 封装进对象里面，导出对象模块
    const domCompatible = {
        //获取dom元素
        queryEle(nString) {
            return getEle(nString)
        },
        addDomEvent(eleObj, eventName, handler) {
            addEleEvent(eleObj, eventName, handler)
        },
        removerEventHadler(eleObj, eventName, handler) {
            removeHandler(eleObj, eventName, handler)
        },
        getInnerText(eleObj){
            getInnerText(eleObj)
        },
        setInnerText(eleObj,text){
            setInnerText(eleObj,text)
        }
    }

    // 返回模块--对象类型
    return domCompatible
})()
