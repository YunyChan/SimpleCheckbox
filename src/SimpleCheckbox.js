/**
 * Created by yunying on 2016/7/8.
 */
(function(oWin, oDoc){
    // Helper
    var Helper = {
        listenEvent: fListenEvent,
        stopPropagation: fStopPropagation,
        preventDefault: fPreventDefault
    };

    function fListenEvent(oDom, sEventName, fCallback, bUseCapture){
        if(oWin.attachEvent){
            oDom.attachEvent('on' + sEventName, function(){
                var oEvent = oWin.event;
                fCallback && fCallback(oEvent);
            });
        }else{
            oDom.addEventListener(sEventName, fCallback, !!bUseCapture);
        }
    }

    function fStopPropagation(oEvent) {
        try{
            oEvent.stopPropagation();
        }catch(e){
            oEvent.cancelBubble = true;
        }
    }

    function fPreventDefault(oEvent) {
        try {
            oEvent.preventDefault();
        }catch(e){
            oEvent.returnValue = false;
        }
    }


    var SimpleCheckbox = fConstructor;
    // 静态变量
    //SimpleCheckbox.prototype.xxx = '';
    // 静态方法
    SimpleCheckbox.prototype.init = fInit;
    SimpleCheckbox.prototype.initEvents = fInitEvents;
    SimpleCheckbox.prototype.render = fRender;
    SimpleCheckbox.prototype.check = fCheck;
    SimpleCheckbox.prototype.uncheck = fUncheck;
    SimpleCheckbox.prototype.toggle = fToggle;
    SimpleCheckbox.prototype.onCheck = fOnCheck;
    SimpleCheckbox.prototype.onUncheck = fOnUncheck;

    function fConstructor(oConf){
        this.config =  oConf = oConf || {};
        this.target = oConf.target;
        this.tip = oConf.tip || '';
        this.checked = !!oConf.checked;
        this.isIE6 = /MSIE 6\.0/.test(window.navigator.userAgent);
        this.init();
        return this;
    }

    function fInit(){
        this.render();
        this.initEvents();
        if(this.checked){
            this.check();
        }else{
            this.uncheck();
        }
    }

    function fInitEvents() {
        var that = this;
        Helper.listenEvent(this.input, 'click', function (oEvent) {
            var bTargetChecked = that.input.checked;
            // console.log('input');
            if(bTargetChecked){
                that.onCheck();
            }else{
                that.onUncheck();
            }
        });
        Helper.listenEvent(this.text, 'click', function (oEvent) {
            // console.log('text');
        });
        Helper.listenEvent(this.label, 'click', function (oEvent) {
            // console.log('label');
            if(that.isIE6){
                var oClickDom = oEvent.target || oEvent.srcElement;
                if(/simple-checkbox-input/.test(oClickDom.className)){
                }else{
                    that.toggle();
                }
            }
        });
        Helper.listenEvent(this.target, 'click', function (oEvent) {
            // console.log('target');
            var bIsClickMe = true;
            var oClickDom = oEvent.target || oEvent.srcElement;
            var sClassName = oClickDom.className;
            if(/simple-checkbox-input/.test(sClassName)){
                bIsClickMe = false;
            }
            if(/simple-checkbox-text/.test(sClassName)){
                bIsClickMe = false;
            }
            if(/simple-checkbox-label/.test(sClassName)){
                bIsClickMe = false;
            }
            if(bIsClickMe){
                that.toggle();
            }
        });
    }

    function fRender() {
        this.label = oDoc.createElement('label');
        this.label.className = 'simple-checkbox-label';

        this.input = oDoc.createElement('input');
        this.input.type = 'checkbox';
        this.input.className = 'simple-checkbox-input';
        this.label.appendChild(this.input);

        if(this.tip){
            this.text = oDoc.createElement('span');
            this.text.className = 'simple-checkbox-text';
            this.text.innerHTML = this.tip;
            this.label.appendChild(this.text);
        }

        this.rawClass = this.target.className;
        this.rootClass = (this.rawClass == ''? '' : ' ') + 'simple-checkbox';
        this.target.appendChild(this.label);
    }

    function fCheck() {
        this.input.checked = true;
        this.onCheck();
    }

    function fUncheck(){
        this.input.checked = false;
        this.onUncheck();
    }
    
    function fOnCheck(){
        this.checked = true;
        this.target.className = this.rootClass + ' simple-checkbox-checked';
    }
    
    function fOnUncheck() {
        this.checked = false;
        this.target.className = this.rootClass;
    }

    function fToggle(){
        if(!this.checked){
            this.check();
        }else{
            this.uncheck();
        }
    }

    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
        define(function() {
            return SimpleCheckbox;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = function(oConf){
            return new SimpleCheckbox(oConf);
        };
        module.exports.SimpleCheckbox = SimpleCheckbox;
    } else {
        if(!oWin.SimpleCheckbox){
            oWin.SimpleCheckbox = SimpleCheckbox;
        }else{
            throw new Error("It's duplicate to defined 'SimpleList', please check the scripts which you has been imported!");
        }
    }

})(window, document);