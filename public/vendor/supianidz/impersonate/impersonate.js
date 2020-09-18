!function(e,t){"function"==typeof define&&define.amd?define(function(){return t(e)}):"object"==typeof module&&module.exports?module.exports=t(e):(void 0===e.tail&&(e.tail={}),e.tail.select=t(e),"undefined"!=typeof jQuery&&(jQuery.fn.tailselect=function(e){var t,i=[];return this.each(function(){!1!==(t=tail.select(this,e))&&i.push(t)}),1===i.length?i[0]:0!==i.length&&i}),"undefined"!=typeof MooTools&&Element.implement({tailselect:function(e){return new tail.select(this,e)}}))}(window,function(e){"use strict";function t(e,t){return!!(e&&"classList"in e)&&e.classList.contains(t)}function i(e,t){return e&&"classList"in e?e.classList.add(t):void 0}function n(e,t){return e&&"classList"in e?e.classList.remove(t):void 0}function s(e,t,i){if(CustomEvent&&CustomEvent.name)var n=new CustomEvent(t,i);else(n=a.createEvent("CustomEvent")).initCustomEvent(t,!!i.bubbles,!!i.cancelable,i.detail);return e.dispatchEvent(n)}function l(e,t){if("function"==typeof Object.assign)return Object.assign({},e,t||{});var i=Object.constructor();for(var n in e)i[n]=n in t?t[n]:e[n];return i}function o(e,t){var i=a.createElement(e);return i.className=t&&t.join?t.join(" "):t||"",i}var r,a=e.document,c=function(e,t){if((e="string"==typeof e?a.querySelectorAll(e):e)instanceof NodeList||e instanceof HTMLCollection||e instanceof Array){for(var i=[],n=e.length,s=0;s<n;s++)i.push(new c(e[s],l(t,{})));return 1===i.length?i[0]:0!==i.length&&i}if(!(e instanceof Element&&this instanceof c))return!!(e instanceof Element)&&new c(e,t);if(c.inst[e.getAttribute("data-tail-select")])return c.inst[e.getAttribute("data-tail-select")];if(e.getAttribute("data-select")){var o=JSON.parse(e.getAttribute("data-select").replace(/\'/g,'"'));o instanceof Object&&(t=l(t,o))}var r=e.getAttribute("placeholder")||e.getAttribute("data-placeholder");return(t="object"==typeof t?t:{}).multiple="multiple"in t?t.multiple:e.multiple,t.disabled="disabled"in t?t.disabled:e.disabled,t.placeholder=r||t.placeholder||null,t.width="auto"===t.width?e.offsetWidth+50:t.width,t.sourceBind="bindSourceSelect"in t?t.bindSourceSelect:t.sourceBind||!1,t.sourceHide="sourceHide"in t?t.sourceHide:t.sourceHide||!0,t.multiLimit=0<=t.multiLimit?t.multiLimit:1/0,this.e=e,this.id=++c.count,this.con=l(c.defaults,t),this.events={},c.inst["tail-"+this.id]=this,this.init().bind()};return c.version="0.5.15",c.status="beta",c.count=0,c.inst={},c.defaults={animate:!0,classNames:null,csvOutput:!1,csvSeparator:",",descriptions:!1,deselect:!1,disabled:!1,height:350,hideDisabled:!1,hideSelected:!1,items:{},locale:"en",linguisticRules:{"е":"ё",a:"ä",o:"ö",u:"ü",ss:"ß"},multiple:!1,multiLimit:1/0,multiPinSelected:!1,multiContainer:!1,multiShowCount:!0,multiShowLimit:!1,multiSelectAll:!1,multiSelectGroup:!0,openAbove:null,placeholder:null,search:!1,searchConfig:["text","value"],searchFocus:!0,searchMarked:!0,searchMinLength:1,searchDisabled:!0,sortItems:!1,sortGroups:!1,sourceBind:!1,sourceHide:!0,startOpen:!1,stayOpen:!1,width:null,cbComplete:void 0,cbEmpty:void 0,cbLoopItem:void 0,cbLoopGroup:void 0},c.strings={en:{all:"All",none:"None",empty:"No Options available",emptySearch:"No Options found",limit:"You can't select more Options",placeholder:"Select an Option...",placeholderMulti:"Select up to :limit Options...",search:"Type in to search...",disabled:"This Field is disabled"},modify:function(e,t,i){if(!(e in this))return!1;if(t instanceof Object)for(var n in t)this.modify(e,n,t[n]);else this[e][t]="string"==typeof i?i:this[e][t];return!0},register:function(e,t){return!!("string"==typeof e&&t instanceof Object)&&(this[e]=t,!0)}},c.prototype={_e:function(e,t,i){if(!(e in this.__))return i||e;if("function"==typeof(e=this.__[e])&&(e=e.call(this,t)),"object"==typeof t)for(var n in t)e=e.replace(n,t[n]);return e},init:function(){var e=this,t=["tail-select"],i=this.con,n=!0===i.classNames?this.e.className:i.classNames;t.push(n&&n.push?n.join(" "):n&&n.split?n:"no-classes"),i.hideSelected&&t.push("hide-selected"),i.hideDisabled&&t.push("hide-disabled"),0==i.multiLimit&&t.push("disabled"),i.multiple&&t.push("multiple"),i.deselect&&t.push("deselect"),i.disabled&&t.push("disabled"),this.__=l(c.strings.en,c.strings[i.locale]||{}),this._init=!0,this._query=!1,this.select=o("DIV",t),this.label=o("DIV","select-label"),this.dropdown=o("DIV","select-dropdown"),this.search=o("DIV","dropdown-search"),this.csvInput=o("INPUT","select-search"),null===this.e.getAttribute("tabindex")?this.select.setAttribute("tabindex",0):this.select.setAttribute("tabindex",this.e.getAttribute("tabindex")),i.width&&/^[0-9.]+(?:cm|mm|in|px|pt|pc|em|ex|ch|rem|vw|vh|vmin|vmax|\%)$/i.test(i.width)?this.select.style.width=i.width:i.width&&!isNaN(parseFloat(i.width,10))&&(this.select.style.width=i.width+"px"),this.label.addEventListener("click",function(){e.toggle.call(e,e.con.animate)}),this.select.appendChild(this.label),isNaN(parseInt(i.height,10))||(this.dropdown.style.maxHeight=parseInt(i.height,10)+"px"),i.search&&(this.search.innerHTML='<input type="text" class="search-input" />',this.search.children[0].placeholder=this._e("search"),this.search.children[0].addEventListener("input",function(){e.query.call(e,this.value.length>i.searchMinLength?this.value:void 0)}),this.dropdown.appendChild(this.search)),this.select.appendChild(this.dropdown),this.csvInput.type="hidden",i.csvOutput&&(this.csvInput.name=this.e.name,this.e.removeAttribute("name"),this.select.appendChild(this.csvInput)),i.multiple&&i.multiContainer&&(a.querySelector(i.multiContainer)?(this.container=a.querySelector(i.multiContainer),this.container.className+=" tail-select-container"):!0===i.multiContainer&&(this.container=this.label,this.container.className+=" tail-select-container")),this.options=new r(this.e,this);for(var s=this.e.options.length,h=0;h<s;h++)this.options.set(this.e.options[h],!1);for(var d in i.items)"string"==typeof i.items[d]&&(i.items[d]={value:i.items[d]}),this.options.add(i.items[d].key||d,i.items[d].value,i.items[d].group,i.items[d].selected,i.items[d].disabled,i.items[d].description);return this.query(),this.e.nextElementSibling?this.e.parentElement.insertBefore(this.select,this.e.nextElementSibling):this.e.parentElement.appendChild(this.select),i.sourceHide&&("none"==this.e.style.display?(this.select.style.display="none",this.e.setAttribute("data-select-hidden","display")):"hidden"==this.e.style.visibility?(this.select.style.visibiltiy="hidden",this.e.setAttribute("data-select-hidden","visibility")):(this.e.style.display="none",this.e.setAttribute("data-select-hidden","0"))),this.e.setAttribute("data-tail-select","tail-"+this.id),e.con.startOpen&&this.open(i.animate),(i.cbComplete||function(){}).call(this,this.select),this._init=!1,this},bind:function(){var e=this;return a.addEventListener("keydown",function(s){var l,o,r,a,c,h=s.keyCode||s.which;if(!(32==h&&e.select===document.activeElement)&&(!t(e.select,"active")||0>[13,27,38,40].indexOf(h)))return!1;if(s.preventDefault(),s.stopPropagation(),32===h)return e.open(e.con.animate);if(13==h&&(l=e.dropdown.querySelector(".dropdown-option.hover:not(.disabled)"))&&e.options.select.call(e.options,l),27==h||13==h)return e.close(e.con.animate);if(l=e.dropdown.querySelector(".dropdown-option.hover:not(.disabled)"))for(n(l,"hover"),r=[(40==h?"next":"previous")+"ElementSibling"];(l=null!==(a=l[r])&&"LI"==l.tagName?a:!!(null!==(a=l.parentElement[r])&&0<a.children.length&&"UL"==a.tagName)&&a.children[40==h?0:a.children.length-1])&&(!t(l,"dropdown-option")||t(l,"disabled")););if(l||40!=h?!l&&38==h&&(l=(c=e.dropdown.querySelectorAll(".dropdown-option:not(.disabled)"))[c.length-1]):l=e.dropdown.querySelector(".dropdown-option:not(.disabled)"),l&&(o=e.dropdown.querySelector(".dropdown-inner"))){var d=function(e){for(var t={top:e.offsetTop,height:e.offsetHeight};(e=e.parentElement)!=o;)t.top+=e.offsetTop;return t}(l);i(l,"hover"),o.scrollTop=Math.max(0,d.top-2*d.height)}return!0}),a.addEventListener("click",function(i){if(!t(e.select,"active")||t(e.select,"idle"))return!1;if(!0===e.con.stayOpen)return!1;for(var n=[e.e,e.select,e.container],s=n.length,l=0;l<s;l++){if(n[l]&&(n[l].contains(i.target)||n[l]==i.target))return!1;if(!i.target.parentElement)return!1}return e.close.call(e,e.con.animate)}),!this.con.sourceBind||(this.e.addEventListener("change",function(t){if(null!=t.detail)return!1;if(t.preventDefault(),t.stopPropagation(),!this.multiple&&this.selectedIndex)e.options.select.call(e.options,this.options[this.selectedIndex]);else{var i=[].concat(e.options.selected),n=[].filter.call(this.querySelectorAll("option:checked"),function(e){return!(0<=i.indexOf(e)&&(i.splice(i.indexOf(e),1),1))});e.options.walk.call(e.options,"unselect",i),e.options.walk.call(e.options,"select",n)}}),!0)},callback:function(e,t,s){var l=e.key.replace(/('|\\)/g,"\\$1"),o=e.group.replace(/('|\\)/g,"\\$1");if("rebuild"==t)return this.query();var r=this.dropdown.querySelector("[data-key='"+l+"'][data-group='"+o+"']");return r&&0<=["select","disable"].indexOf(t)?i(r,"select"==t?"selected":"disabled"):r&&0<=["unselect","enable"].indexOf(t)&&n(r,"unselect"==t?"selected":"disabled"),this.update(e),!0===s||this.trigger("change",e,t)},trigger:function(e){if(this._init)return!1;var t={bubbles:!1,cancelable:!0,detail:{args:arguments,self:this}};"change"==e&&arguments[2]&&0<=arguments[2].indexOf("select")&&(s(this.e,"input",t),s(this.e,"change",t)),s(this.select,"tail::"+e,t);var i,n=[];return Array.prototype.map.call(arguments,function(e,t){0<t&&n.push(e)}),(this.events[e]||[]).forEach(function(e){(i=[].concat(n)).push(e.args||null),(e.cb||function(){}).apply(t.detail.self,i)}),!0},calc:function(){var t=this.dropdown.cloneNode(!0),s=this.con.height,l=0,o=this.dropdown.querySelector(".dropdown-inner");(t=this.dropdown.cloneNode(!0)).style.cssText="height:auto;min-height:auto;max-height:none;opacity:0;display:block;visibility:hidden;",t.style.maxHeight=this.con.height+"px",t.className+=" cloned",this.dropdown.parentElement.appendChild(t),s=s>t.clientHeight?t.clientHeight:s,this.con.search&&(l=t.querySelector(".dropdown-search").clientHeight),this.dropdown.parentElement.removeChild(t);var r=this.select.getBoundingClientRect(),a=e.innerHeight-(r.top+r.height),c=!!(s+l>a)&&r.top>a;return!0===this.con.openAbove||!1!==this.con.openAbove&&c?(c=!0,s=Math.min(s,r.top-10),i(this.select,"open-top")):(c=!1,s=Math.min(s,a-10),n(this.select,"open-top")),o&&(this.dropdown.style.maxHeight=s+"px",o.style.maxHeight=s-l+"px"),this},query:function(e,i){var n,s,l,r,a,c,h=this,d=this.con,u="getAttribute",p=o("DIV","dropdown-inner"),f=e?"finder":"walker",m=e?[e,i]:[d.sortItems,d.sortGroups];for(this._query="string"==typeof e&&e;n=this.options[f].apply(this.options,m);){if(!l||l&&l[u]("data-group")!==n.group){if(!((s=(d.cbLoopGroup||this.cbGroup).call(this,n.group,e,p))instanceof Element))break;(l=s).setAttribute("data-group",n.group),p.appendChild(l)}if(null!==(r=(d.cbLoopItem||this.cbItem).call(this,n,l,e,p))){if(!1===r)break;r.setAttribute("data-key",n.key),r.setAttribute("data-group",n.group),r.addEventListener("click",function(){if(!this.hasAttribute("data-key"))return!1;var e=this[u]("data-key"),t=this[u]("data-group")||"#";h.options.toggle.call(h.options,e,t)&&!1===h.con.stayOpen&&!h.con.multiple&&h.close.call(h,h.con.animate)}),l.appendChild(r)}}var b=p.querySelectorAll("*[data-key]").length;0==b&&(this.con.cbEmpty||function(e){var t=o("SPAN","dropdown-empty");t.innerText=this._e("empty"),e.appendChild(t)}).call(this,p,e),0<b&&d.multiple&&d.multiLimit==1/0&&d.multiSelectAll&&(a=o("BUTTON","tail-all"),c=o("BUTTON","tail-none"),a.innerText=this._e("all"),a.addEventListener("click",function(e){e.preventDefault();var t=h.dropdown.querySelectorAll(".dropdown-inner .dropdown-option");h.options.walk.call(h.options,"select",t)}),c.innerText=this._e("none"),c.addEventListener("click",function(e){e.preventDefault();var t=h.dropdown.querySelectorAll(".dropdown-inner .dropdown-option");h.options.walk.call(h.options,"unselect",t)}),(r=o("SPAN","dropdown-action")).appendChild(a),r.appendChild(c),p.insertBefore(r,p.children[0]));var g=this.dropdown.querySelector(".dropdown-inner");return this.dropdown[(g?"replace":"append")+"Child"](p,g),t(this.select,"active")&&this.calc(),this.updateCSV().updateLabel()},cbGroup:function(e){var t,i,n=o("UL","dropdown-optgroup"),s=this;return"#"==e?n:(n.innerHTML='<li class="optgroup-title"><b>'+e+"</b></li>",this.con.multiple&&this.con.multiLimit==1/0&&this.con.multiSelectAll&&(t=o("BUTTON","tail-none"),i=o("BUTTON","tail-all"),t.innerText=this._e("none"),t.addEventListener("click",function(e){e.preventDefault();var t=this.parentElement.parentElement.getAttribute("data-group");s.options.all.call(s.options,"unselect",t)}),i.innerText=this._e("all"),i.addEventListener("click",function(e){e.preventDefault();var t=this.parentElement.parentElement.getAttribute("data-group");s.options.all.call(s.options,"select",t)}),n.children[0].appendChild(t),n.children[0].appendChild(i)),n)},cbItem:function(e,t,i){var n=o("LI","dropdown-option"+(e.selected?" selected":"")+(e.disabled?" disabled":""));return i&&0<i.length&&this.con.searchMarked?(i=this.options.applyLinguisticRules(i),n.innerHTML=e.value.replace(new RegExp("("+i+")","i"),"<mark>$1</mark>")):n.innerText=e.value,this.con.descriptions&&e.description&&(n.innerHTML+='<span class="option-description">'+e.description+"</span>"),n},update:function(e){return this.updateLabel().updateContainer(e).updatePin(e).updateCSV(e)},updateLabel:function(e){if(this.container==this.label&&0<this.options.selected.length)return this.label.querySelector(".label-inner")&&this.label.removeChild(this.label.querySelector(".label-inner")),this.label.querySelector(".label-count")&&this.label.removeChild(this.label.querySelector(".label-count")),this;var i,n=this.con,s=this.options.selected.length;return"string"!=typeof e&&(e=n.disabled?"disabled":0==this.dropdown.querySelectorAll("*[data-key]").length?"empty"+(t(this.select,"in-search")?"Search":""):n.multiLimit<=s?"limit":!n.multiple&&0<this.options.selected.length?this.options.selected[0].innerText:"string"==typeof n.placeholder?n.placeholder:"placeholder"+(n.multiple&&n.multiLimit<1/0?"Multi":"")),e='<span class="label-inner">'+(e=this._e(e,{":limit":n.multiLimit},e))+"</span>",i=n.multiShowLimit&&n.multiLimit<1/0,n.multiple&&n.multiShowCount&&(e=(e='<span class="label-count">:c</span>'+e).replace(":c",s+(i?" / "+n.multiLimit:""))),this.label.innerHTML=e,this},updateContainer:function(e){if(!this.container||!this.con.multiContainer)return this;var t="[data-group='"+e.group+"'][data-key='"+e.key+"']";if(this.container.querySelector(t))return e.selected||this.container.removeChild(this.container.querySelector(t)),this;if(e.selected){var i=this,n=o("DIV","select-handle");n.innerText=e.value,n.setAttribute("data-key",e.key),n.setAttribute("data-group",e.group),n.addEventListener("click",function(e){e.preventDefault(),e.stopPropagation();var t=this.getAttribute("data-key"),n=this.getAttribute("data-group");i.options.unselect.call(i.options,t,n)}),this.container.appendChild(n)}return this},updatePin:function(e){var t=this.dropdown.querySelector(".dropdown-inner ul"),i="li[data-key='"+e.key+"'][data-group='"+e.group+"']";if(!this.con.multiPinSelected||!t||!1!==this._query)return this;if(i=this.dropdown.querySelector(i),e.selected)t.insertBefore(i,t.children[0]);else{for(var n=this.dropdown.querySelector("ul[data-group='"+e.group+"']"),s=this.options[e.index-1],l=!1;s&&s.group==e.group&&!(l=n.querySelector("li[data-key='"+s.key+"']"));)s=this.options[s.index-1];l&&l.nextElementSibling?n.insertBefore(i,l.nextElementSibling):n.appendChild(i)}return this},updateCSV:function(){if(!this.csvInput||!this.con.csvOutput)return this;for(var e=[],t=this.options.selected.length,i=0;i<t;i++)e.push(this.options.selected[i].value);return this.csvInput.value=e.join(this.con.csvSeparator||","),this},open:function(e){if(t(this.select,"active")||t(this.select,"idle")||this.con.disabled)return!1;this.calc();var s=function(){i(l.select,"active"),n(l.select,"idle"),this.dropdown.style.height="auto",this.dropdown.style.overflow="visible",this.label.removeAttribute("style"),this.con.search&&this.con.searchFocus&&this.dropdown.querySelector("input").focus(),this.trigger.call(this,"open")},l=this,o=this.dropdown.style;return!1===e?(o.cssText="height:"+o.maxHeight+";display:block;overflow:hidden;",s.call(this)):(this.label.style.zIndex=25,this.dropdown.style.cssText+="height:0;display:block;overflow:hidden;",i(l.select,"idle"),function e(){var t=parseInt(o.height,10),i=parseInt(o.maxHeight,10);return t>=i?s.call(l):(o.height=(t+50>i?i:t+50)+"px",void setTimeout(e,20))}()),this},close:function(e){if(!t(this.select,"active")||t(this.select,"idle"))return!1;var s=function(){n(this.select,"active"),n(this.select,"idle"),this.dropdown.removeAttribute("style"),this.dropdown.querySelector(".dropdown-inner").removeAttribute("style"),this.trigger.call(this,"close")},l=this,o=this.dropdown;return!1===e?s.call(this):(i(this.select,"idle"),this.dropdown.style.overflow="hidden",function e(){return 0>=parseInt(o.offsetHeight,10)-50?s.call(l):(o.style.height=parseInt(o.offsetHeight,10)-50+"px",void setTimeout(e,20))}()),this},toggle:function(e){return t(this.select,"active")?this.close(e):t(this.select,"idle")?this:this.open(e)},remove:function(){if(this.e.removeAttribute("data-tail-select"),this.e.hasAttribute("data-select-hidden")&&("0"==this.e.getAttribute("data-select-hidden")&&this.e.style.removeProperty("display"),this.e.removeAttribute("data-select-hidden")),Array.prototype.map.call(this.e.querySelectorAll("[data-select-option='add']"),function(e){e.parentElement.removeChild(e)}),Array.prototype.map.call(this.e.querySelectorAll("[data-select-optgroup='add']"),function(e){e.parentElement.removeChild(e)}),this.e.name=this.csvInput.hasAttribute("name")?this.csvInput.name:this.e.name,this.select.parentElement&&this.select.parentElement.removeChild(this.select),this.container)for(var e=this.container.querySelectorAll(".select-handle"),t=e.length,i=0;i<t;i++)this.container.removeChild(e[i]);return this},reload:function(){return this.remove().init()},config:function(e,t,i){if(e instanceof Object){for(var n in e)this.config(n,e[n],!1);return this.reload(),this.con}return void 0===e?this.con:!!(e in this.con)&&(void 0===t?this.con[e]:(this.con[e]=t,!1!==i&&this.reload(),this))},enable:function(e){return n(this.select,"disabled"),this.e.disabled=!1,this.con.disabled=!1,!1===e?this:this.reload()},disable:function(e){return i(this.select,"disabled"),this.e.disabled=!0,this.con.disabled=!0,!1===e?this:this.reload()},on:function(e,t,i){return!(0>["open","close","change"].indexOf(e)||"function"!=typeof t)&&(e in this.events||(this.events[e]=[]),this.events[e].push({cb:t,args:i instanceof Array?i:[]}),this)},value:function(){return 0==this.options.selected.length?null:this.con.multiple?this.options.selected.map(function(e){return e.value}):this.options.selected[0].value}},(r=c.options=function(e,t){return this instanceof r?(this.self=t,this.element=e,this.length=0,this.selected=[],this.disabled=[],this.items={"#":{}},this.groups={},this):new r(e,t)}).prototype={_r:function(e){return e.replace("disabled","disable").replace("enabled","enable").replace("selected","select").replace("unselected","unselect")},get:function(e,t){if("object"==typeof e&&e.key&&e.group)t=e.group||t,e=e.key;else if(e instanceof Element)"OPTION"==e.tagName?(t=e.parentElement.label||"#",e=e.value||e.innerText):e.hasAttribute("data-key")&&(t=e.getAttribute("data-group")||e.parentElement.getAttribute("data-group")||"#",e=e.getAttribute("data-key"));else if("string"!=typeof e)return!1;return e=/^[0-9]+$/.test(e)?"_"+e:e,!!(t in this.items)&&this.items[t][e]},set:function(e,t){var i=e.value||e.innerText,n=e.parentElement.label||"#";if(n in this.items||(this.items[n]={},this.groups[n]=e.parentElement),i in this.items[n])return!1;var s=/^[0-9]+$/.test(i)?"_"+i:i,l=this.self.con;if(l.multiple&&this.selected.length>=l.multiLimit&&(e.selected=!1),e.selected&&l.deselect&&(!e.hasAttribute("selected")||0==l.multiLimit)&&(e.selected=!1,e.parentElement.selectedIndex=-1),e.hasAttribute("data-description")){var r=o("SPAN");r.innerHTML=e.getAttribute("data-description"),e.setAttribute("data-description",r.innerHTML)}return this.items[n][s]={key:i,value:e.text,description:e.getAttribute("data-description")||null,group:n,option:e,optgroup:"#"==n?void 0:this.groups[n],selected:e.selected,disabled:e.disabled,hidden:e.hidden||!1},this.length++,e.selected&&this.select(this.items[n][s]),e.disabled&&this.disable(this.items[n][s]),!t||this.self.callback(this.items[n][i],"rebuild")},add:function(e,t,i,n,s,l,r){if(e instanceof Object){for(var c in e)this.add(e[c].key||c,e[c].value,e[c].group,e[c].selected,e[c].disabled,e[c].description,!1);return this.self.query()}if(this.get(e,i))return!1;if("#"!==(i="string"==typeof i?i:"#")&&!(i in this.groups)){var h=o("OPTGROUP");h.label=i,h.setAttribute("data-select-optgroup","add"),this.element.appendChild(h),this.items[i]={},this.groups[i]=h}this.self.con.multiple&&this.selected.length>=this.self.con.multiLimit&&(n=!1),s=!!s;var d=a.createElement("OPTION");return d.value=e,d.selected=n,d.disabled=s,d.innerText=t,d.setAttribute("data-select-option","add"),l&&0<l.length&&d.setAttribute("data-description",l),("#"==i?this.element:this.groups[i]).appendChild(d),this.set(d,r)},move:function(e,t,i,n){if(!(e=this.get(e,t)))return!1;if("#"!==i&&!(i in this.groups)){var s=o("OPTGROUP");s.label=i,this.element.appendChild(s),this.items[i]={},this.groups[i]=s,this.groups[i].appendChild(e.option)}return delete this.items[e.group][e.key],e.group=i,e.optgroup=this.groups[i]||void 0,this.items[i][e.key]=e,!n||this.self.query()},remove:function(e,t,i){if(!(e=this.get(e,t)))return!1;e.selected&&this.unselect(e),e.disabled&&this.enable(e),e.option.parentElement.removeChild(e.option);var n=/^[0-9]+$/.test(e.key)?"_"+e.key:e.key;return delete this.items[e.group][n],this.length--,0===Object.keys(this.items[e.group]).length&&(delete this.items[e.group],delete this.groups[e.group]),!i||this.self.query()},is:function(e,t,i){e=this._r(e);var n=this.get(t,i);return!n||0>["select","unselect","disable","enable"].indexOf(e)?null:"disable"==e||"enable"==e?"disable"==e?n.disabled:!n.disabled:("select"==e||"unselect"==e)&&("select"==e?n.selected:!n.selected)},handle:function(e,i,n,s){var l=this.get(i,n);e=this._r(e);if(!l||0>["select","unselect","disable","enable"].indexOf(e))return null;if("disable"==e||"enable"==e)return l.option in this.disabled||"disable"!=e?l.option in this.disabled&&"enable"==e&&this.disabled.splice(this.disabled.indexOf(l.option),1):this.disabled.push(l.option),l.disabled="disable"==e,l.option.disabled="disable"==e,this.self.callback.call(this.self,l,e);var o=t(this.self.select,"disabled")||l.disabled||l.option.disabled,r=this.self.con.multiple&&this.self.con.multiLimit<=this.selected.length,a=!this.self.con.multiple&&0<this.selected.indexOf(l.option),c=0==this.self.con.multiLimit&&1==this.self.con.deselect,h=!this.self.con.multiple&&!this.self.con.deselect&&!0!==s;if("select"==e){if(o||r||c||a)return!1;if(!this.self.con.multiple)for(var d in this.selected)this.unselect(this.selected[d],void 0,!0);0>this.selected.indexOf(l.option)&&this.selected.push(l.option)}else if("unselect"==e){if(o||h)return!1;this.selected.splice(this.selected.indexOf(l.option),1)}return l.selected="select"==e,l.option.selected="select"==e,l.option[(6<e.length?"remove":"set")+"Attribute"]("selected","selected"),this.self.callback.call(this.self,l,e,s)},enable:function(e,t){return this.handle("enable",e,t,!1)},disable:function(e,t){return this.handle("disable",e,t,!1)},select:function(e,t){return this.handle("select",e,t,!1)},unselect:function(e,t,i){return this.handle("unselect",e,t,i)},toggle:function(e,t){return!!(e=this.get(e,t))&&this.handle(e.selected?"unselect":"select",e,t,!1)},invert:function(e){if(e=this._r(e),0<=["enable","disable"].indexOf(e))var t=this.disabled,i="enable"==e?"disable":"enable";else if(0<=["select","unselect"].indexOf(e))t=this.selected,i="select"==e?"unselect":"select";var n=Array.prototype.filter.call(this,function(e){return!(e in t)}),s=this;return[].concat(t).forEach(function(e){s.handle.call(s,i,e)}),[].concat(n).forEach(function(t){s.handle.call(s,e,t)}),!0},all:function(e,t){var i=this,n=this;return t in this.items?n=Object.keys(this.items[t]):0<=["unselect","enable"].indexOf(e)&&(n=[].concat("unselect"==e?this.selected:this.disabled)),Array.prototype.forEach.call(n,function(n){i.handle.call(i,e,n,t,!1)}),!0},walk:function(e,t,i){if(t instanceof Array||t.length)for(var n=t.length,s=0;s<n;s++)this.handle.apply(this,[e,t[s],null].concat(i));else if(t instanceof Object){var l=this;if(t.forEach)t.forEach(function(t){l.handle.apply(l,[e,t,null].concat(i))});else for(var o in t)("string"==typeof t[o]||"number"==typeof t[o]||t[o]instanceof Element)&&this.handle.apply(this,[e,t[o],o in this.items?o:null]).concat(i)}return this},applyLinguisticRules:function(e,t){var i=this.self.con.linguisticRules,n=[];return Object.keys(i).forEach(function(e){n.push("("+e+"|["+i[e]+"])")}),t&&(n=n.concat(n.map(function(e){return e.toUpperCase()}))),e.replace(new RegExp(n.join("|"),t?"g":"ig"),function(e){return n[[].indexOf.call(arguments,e,1)-1]})},find:function(e,t){var i,n=this,s={};if(t||(t=this.self.con.searchConfig),"function"==typeof t)i=t.bind(this,e);else{(t=t instanceof Array?t:[t]).forEach(function(e){"string"==typeof e&&(s[e]=!0)}),s.any=s.any?s.any:s.attributes&&s.value,(!s.regex||s.text)&&(e=e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")),s.exactglyphes||(e=this.self.options.applyLinguisticRules(e,s.case)),s.word&&(e="\\b"+e+"\\b");var l=new RegExp(e,s.case?"m":"mi"),o=function(e){return l.test(e.text||e.value)};if(i=s.any?function(e){return o(e)||[].some.call(e.attributes,o)}:s.attributes?function(e){return[].some.call(e.attributes,o)}:o,!this.self.con.searchDisabled){var r=i;i=function(e){return!e.disabled&&r(e)}}}return[].filter.call(this.self.e.options,i).map(function(e){return!e.hidden&&n.get(e)})},finder:function(e,t){void 0===this._finderLoop&&(this._finderLoop=this.find(e,t));for(var i;void 0!==(i=this._finderLoop.shift());)return i;return delete this._finderLoop,!1},walker:function(e,t){if(void 0!==this._inLoop&&this._inLoop){if(0<this._inItems.length){do{var i=this.items[this._inGroup][this._inItems.shift()]}while(!0===i.hidden);return i}if(0<this._inGroups.length){for(;0<this._inGroups.length;){var n=this._inGroups.shift();if(!(n in this.items))return!1;var s=Object.keys(this.items[n]);if(0<s.length)break}return"ASC"==e?s.sort():"DESC"==e?s.sort().reverse():"function"==typeof e&&(s=e.call(this,s)),this._inItems=s,this._inGroup=n,this.walker(null,null)}return delete this._inLoop,delete this._inItems,delete this._inGroup,delete this._inGroups,!1}var l=Object.keys(this.groups)||[];return"ASC"==t?l.sort():"DESC"==t?l.sort().reverse():"function"==typeof t&&(l=t.call(this,l)),l.unshift("#"),this._inLoop=!0,this._inItems=[],this._inGroups=l,this.walker(e,null)}},c}),((e,t)=>{"use strict";const i={GetUser:i=>{fetch(t).then(e=>e.json()).then(t=>{let n=[];Object.keys(t).forEach(i=>{try{t[i].forEach(t=>{n.push({key:t.id,value:t.name,group:i.toUpperCase(),selected:e===t.id})})}catch(s){n.push({key:t[i].id,value:t[i].name,selected:e===t[i].id})}}),i.config("items",n)})}};i.LaraPersonateInit=(()=>{String.prototype.ucwords=function(){return this.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,e=>e.toUpperCase())};const e=document.getElementsByClassName("_impersonate-toggle"),t=document.getElementsByClassName("_impersonate-interface");e[0].addEventListener("click",()=>t[0].classList.toggle("_impersonate-hidden")),document.addEventListener("DOMContentLoaded",()=>{i.GetUser(tail.select(document.getElementsByClassName("_impersonate-select"),{search:!0,width:"100%"}))})}),i.LaraPersonateInit()})(impersonate_current_user_id,impersonate_user_list_url);
