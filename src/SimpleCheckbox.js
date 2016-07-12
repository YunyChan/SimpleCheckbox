/**
 * Created by yunying on 2016/7/8.
 */
(function(oWin, oDoc){
    // Helper
    var Helper = {
        listenEvent: fListenEvent,
        stopPropagation: fStopPropagation,
        preventDefault: fPreventDefault,
        getDOM: fGetDOM
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

    function fGetDOM(oRoot, sQuery) {
        var sMatch = sQuery.match(/([\w\-]*)([\.#])([\w\-]*)/);
        var sTag = '';
        var sAttribute = '';
        var sClass = '';
        if(sMatch.length > 1){
            sTag = sMatch[1];
            sAttribute = sMatch[2] == '#' ? 'id' : 'class';
            sClass = sMatch[3];
            var oTargetClassRegExp = new RegExp(sClass);
            var oDOMs = oRoot.getElementsByTagName(sTag);
            for(var cnt = 0, length = oDOMs.length; cnt < length; cnt ++){
                var oDOM = oDOMs[cnt];
                if(oTargetClassRegExp.test(oDOM.getAttribute(sAttribute))){
                    return oDOM;
                }
            }
        }
        return null;
    }

    var SimpleCheckbox = fConstructor;
    // 静态变量
    //SimpleCheckbox.prototype.xxx = '';
    // 静态方法
    SimpleCheckbox.prototype.init = fInit;
    SimpleCheckbox.prototype.initEvents = fInitEvents;
    SimpleCheckbox.prototype.render = fRender;
    SimpleCheckbox.prototype.renderDOM = fRenderDOM;
    SimpleCheckbox.prototype.getValue = fGetValue;
    SimpleCheckbox.prototype.setValue = fSetValue;
    SimpleCheckbox.prototype.check = fCheck;
    SimpleCheckbox.prototype.uncheck = fUncheck;
    SimpleCheckbox.prototype.toggle = fToggle;
    SimpleCheckbox.prototype.onCheck = fOnCheck;
    SimpleCheckbox.prototype.onUncheck = fOnUncheck;

    function fConstructor(oConf){
        this.config =  oConf = oConf || {};
        this.target = oConf.target;
        this.bind = !!oConf.bind;
        this.checked = !!oConf.checked;
        this.name = oConf.name || '';
        this.tip = oConf.tip || '';
        this.isIE6 = /MSIE 6\.0/.test(window.navigator.userAgent);
        this.init();
        return this;
    }

    function fInit(){
        this.render();
        this.initEvents();
        this.setValue(this.checked);
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
            if(/simple-checkbox-tip/.test(sClassName)){
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
        this.renderDOM();
        this.rawClass = this.target.className;
        this.rootClass = (this.rawClass == ''? '' : ' ') + 'simple-checkbox';
    }

    function fRenderDOM() {
        if(this.bind){
            this.label = Helper.getDOM(this.target, 'label.simple-checkbox-label');
            this.input = Helper.getDOM(this.target, 'input.simple-checkbox-input');
            this.checked = this.input.checked;
            this.text = Helper.getDOM(this.target, 'span.simple-checkbox-tip');
            this.tip = this.text ? this.text.innerHTML : '';
        }else{
            this.label = oDoc.createElement('label');
            this.label.className = 'simple-checkbox-label';
            
            this.input = oDoc.createElement('input');
            this.input.type = 'checkbox';
            this.input.className = 'simple-checkbox-input';
            if(this.name){
                this.input.name = this.name;
            }
            this.label.appendChild(this.input);
            
            if(this.tip){
                this.text = oDoc.createElement('span');
                this.text.className = 'simple-checkbox-tip';
                this.text.innerHTML = this.tip;
                this.label.appendChild(this.text);
            }
            
            this.target.appendChild(this.label);
        }
    }

    function fGetValue() {
        return this.checked;
    }

    function fSetValue(bChecked) {
        this.checked = !!bChecked;
        if(this.checked){
            this.check();
        }else{
            this.uncheck();
        }
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