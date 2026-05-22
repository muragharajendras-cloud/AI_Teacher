(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,74574,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.baseAssetPath=void 0;let a="u">typeof window&&void 0!==window.document?window.document.currentScript:null,s="/";a&&(s=a.src.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^/]+$/,"/")),i.baseAssetPath=s},22237,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.defaultModelFetcher=void 0,i.defaultModelFetcher=t=>fetch(t).then(t=>t.arrayBuffer())},74389,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.log=void 0;let a=t=>r=>{console.log(`VAD | ${t} >`,r)};i.log={error:a("error"),debug:a("debug"),warn:a("warn")}},42827,(t,r,i)=>{"use strict";var a,s;Object.defineProperty(i,"__esModule",{value:!0}),i.Message=void 0,(s=a||(i.Message=a={})).AudioFrame="AUDIO_FRAME",s.SpeechStart="SPEECH_START",s.VADMisfire="VAD_MISFIRE",s.SpeechEnd="SPEECH_END",s.SpeechStop="SPEECH_STOP",s.SpeechRealStart="SPEECH_REAL_START",s.FrameProcessed="FRAME_PROCESSED"},43489,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.FrameProcessor=i.validateOptions=i.defaultFrameProcessorOptions=void 0;let a=t.r(74389),s=t.r(42827);i.defaultFrameProcessorOptions={positiveSpeechThreshold:.3,negativeSpeechThreshold:.25,preSpeechPadMs:800,redemptionMs:1400,minSpeechMs:400,submitUserSpeechOnPause:!1},i.validateOptions=function(t){(t.positiveSpeechThreshold<0||t.positiveSpeechThreshold>1)&&a.log.error("positiveSpeechThreshold should be a number between 0 and 1"),(t.negativeSpeechThreshold<0||t.negativeSpeechThreshold>t.positiveSpeechThreshold)&&a.log.error("negativeSpeechThreshold should be between 0 and positiveSpeechThreshold"),t.preSpeechPadMs<0&&a.log.error("preSpeechPadMs should be positive"),t.redemptionMs<0&&a.log.error("redemptionMs should be positive"),t.minSpeechMs<0&&a.log.error("minSpeechMs should be positive")};let n=t=>{let r=t.reduce((t,r)=>(t.push(t.at(-1)+r.length),t),[0]),i=new Float32Array(r.at(-1));return t.forEach((t,a)=>{let s=r[a];i.set(t,s)}),i};function o(t,r){let i=Math.floor(t.redemptionMs/r);return{redemptionFrames:i,preSpeechPadFrames:Math.floor(t.preSpeechPadMs/r),minSpeechFrames:Math.floor(t.minSpeechMs/r)}}i.FrameProcessor=class{constructor(t,r,i,a){this.modelProcessFunc=t,this.modelResetFunc=r,this.options=i,this.msPerFrame=a,this.speaking=!1,this.redemptionCounter=0,this.speechFrameCount=0,this.active=!1,this.speechRealStartFired=!1,this.setOptions=t=>{this.options={...this.options,...t};let{redemptionFrames:r,preSpeechPadFrames:i,minSpeechFrames:a}=o(this.options,this.msPerFrame);this.redemptionFrames=r,this.preSpeechPadFrames=i,this.minSpeechFrames=a},this.reset=()=>{this.speaking=!1,this.speechRealStartFired=!1,this.audioBuffer=[],this.modelResetFunc(),this.redemptionCounter=0,this.speechFrameCount=0},this.pause=t=>{this.active=!1,this.options.submitUserSpeechOnPause?this.endSegment(t):this.reset()},this.resume=()=>{this.active=!0},this.endSegment=t=>{let r=this.audioBuffer;this.audioBuffer=[];let i=this.speaking;if(this.reset(),i)if(r.reduce((t,r)=>r.isSpeech?t+1:t,0)>=this.minSpeechFrames){let i=n(r.map(t=>t.frame));t({msg:s.Message.SpeechEnd,audio:i})}else t({msg:s.Message.VADMisfire});return{}},this.process=async(t,r)=>{if(!this.active)return;let i=await this.modelProcessFunc(t),a=i.isSpeech>=this.options.positiveSpeechThreshold;if(r({probs:i,msg:s.Message.FrameProcessed,frame:t}),this.audioBuffer.push({frame:t,isSpeech:a}),a&&(this.speechFrameCount++,this.redemptionCounter=0),a&&!this.speaking&&(this.speaking=!0,r({msg:s.Message.SpeechStart})),this.speaking&&this.speechFrameCount===this.minSpeechFrames&&!this.speechRealStartFired&&(this.speechRealStartFired=!0,r({msg:s.Message.SpeechRealStart})),i.isSpeech<this.options.negativeSpeechThreshold&&this.speaking&&++this.redemptionCounter>=this.redemptionFrames){this.redemptionCounter=0,this.speechFrameCount=0,this.speaking=!1,this.speechRealStartFired=!1;let t=this.audioBuffer;if(this.audioBuffer=[],t.reduce((t,r)=>r.isSpeech?t+1:t,0)>=this.minSpeechFrames){let i=n(t.map(t=>t.frame));r({msg:s.Message.SpeechEnd,audio:i})}else r({msg:s.Message.VADMisfire})}if(!this.speaking){for(;this.audioBuffer.length>this.preSpeechPadFrames;)this.audioBuffer.shift();this.speechFrameCount=0}},this.audioBuffer=[];const{redemptionFrames:u,preSpeechPadFrames:l,minSpeechFrames:d}=o(this.options,this.msPerFrame);this.redemptionFrames=u,this.preSpeechPadFrames=l,this.minSpeechFrames=d,this.reset()}}},74450,(t,r,i)=>{"use strict";var a,s,n,o,u,l,d,p,c,h,f,m,g,y,_,b,$,w,v,x,S,T,E,k,I,C,z,A,O,R,B,M,D,P,U,N,L,V,q,F,W,G,j,H,K,Z,Q,X,Y,J,ee,et,er,ei,ea,es,en,eo,eu,el,ed,ep,ec,eh,ef,em,eg,ey,e_,eb,e$,ew,ev,ex,eS,eT,eE,ek,eI,eC,ez,eA,eO,eR,eB,eM,eD,eP,eU,eN,eL,eV,eq,eF,eW,eG,ej,eH,eK,eZ,eQ,eX,eY,eJ,e0,e1,e2,e3,e4,e6,e8,e5,e7,e9,te,tt,tr,ti,ta,ts,tn,to,tu,tl,td,tp,tc,th,tf,tm,tg,ty,t_,tb,t$,tw,tv,tx,tS,tT,tE,tk,tI,tC,tz,tA,tO,tR,tB,tM,tD,tP,tU,tN,tL,tV,tq,tF,tW,tG,tj,tH,tK,tZ,tQ,tX,tY,tJ,t0,t1,t2,t3,t4,t6,t8,t5,t7,t9,re,rt,rr,ri,ra,rs,rn,ro,ru,rl,rd,rp,rc,rh,rf,rm,rg,ry,r_,rb,r$,rw,rv,rx,rS,rT,rE,rk,rI,rC,rz,rA,rO,rR,rB,rM,rD,rP,rU,rN,rL,rV,rq,rF,rW,rG,rj,rH,rK,rZ,rQ,rX,rY,rJ,r0,r1,r2,r3,r4,r6,r8,r5,r7,r9,ie,it,ir,ii,ia,is,io,iu,il,id,ip,ic,ih,im,ig,iy,i_,ib,i$,iw,iv,ix,iS,iT,iE,ik,iI,iC,iz,iA,iO,iR,iB,iM,iD,iP,iU,iN,iL,iV,iq,iF,iW,iG,ij,iH,iK,iZ,iQ,iX,iY,iJ,i0,i1,i2,i3,i4,i6,i8,i5,i7,i9,ae,at,ar,ai,aa,as,an,ao,au,al,ad,ap,ac,ah,af,am,ag,ay,a_,ab,a$,aw,av,ax,aS,aT,aE,ak,aI,aC,az,aA,aO,aR,aB,aM,aD,aP,aU,aN,aL,aV,aq,aF,aW,aG,aj,aH,aK,aZ,aQ,aX,aY,aJ,a0,a1,a2,a3,a4,a6,a8,a5,a7,a9,se,st,sr,si,sa,ss,sn,so,su,sl,sd,sp,sc,sh,sf,sm,sg,sy,s_,sb,s$,sw,sv,sx,sS,sT,sE,sk,sI,sC,sz,sA,sO,sR,sB,sM,sD,sP,sU,sN,sL,sV,sq,sF,sW,sG,sj,sH,sK,sZ,sQ,sX,sY,sJ,s0,s1,s2,s3,s4,s6,s8,s5,s7,s9,ne,nt,nr,ni,na,ns,nn,no,nu,nl,nd,np,nc,nh,nf,nm,ng,ny,n_,nb,n$,nw,nv,nx,nS,nT,nE,nk,nI,nC,nz,nA,nO,nR,nB,nM,nD,nP,nU,nN,nL,nV,nq,nF,nW,nG,nj,nH,nK,nZ,nQ,nX,nY,nJ,n0,n1,n2,n3,n4,n6,n8,n5,n7;let n9;a=Object.defineProperty,s=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,o=Object.prototype.hasOwnProperty,u=t.t,l=(t,r)=>()=>(t&&(r=t(t=0)),r),d=(t,r)=>{for(var i in r)a(t,i,{get:r[i],enumerable:!0})},p=t=>((t,r,i)=>{if(r&&"object"==typeof r||"function"==typeof r)for(let u of n(r))o.call(t,u)||void 0===u||a(t,u,{get:()=>r[u],enumerable:!(i=s(r,u))||i.enumerable});return t})(a({},"__esModule",{value:!0}),t),y=l(()=>{c=new Map,h=[],f=(t,r,i)=>{if(r&&"function"==typeof r.init&&"function"==typeof r.createInferenceSessionHandler){let a=c.get(t);if(void 0===a)c.set(t,{backend:r,priority:i});else{if(a.priority>i)return;if(a.priority===i&&a.backend!==r)throw Error(`cannot register backend "${t}" using priority ${i}`)}if(i>=0){let r=h.indexOf(t);-1!==r&&h.splice(r,1);for(let r=0;r<h.length;r++)if(c.get(h[r]).priority<=i)return void h.splice(r,0,t);h.push(t)}return}throw TypeError("not a valid backend")},m=async t=>{let r=c.get(t);if(!r)return"backend not found.";if(r.initialized)return r.backend;if(r.aborted)return r.error;{let i=!!r.initPromise;try{return i||(r.initPromise=r.backend.init(t)),await r.initPromise,r.initialized=!0,r.backend}catch(t){return i||(r.error=`${t}`,r.aborted=!0),r.error}finally{delete r.initPromise}}},g=async t=>{let r=t.executionProviders||[],i=r.map(t=>"string"==typeof t?t:t.name),a=0===i.length?h:i,s,n=[],o=new Set;for(let t of a){let r=await m(t);"string"==typeof r?n.push({name:t,err:r}):(s||(s=r),s===r&&o.add(t))}if(!s)throw Error(`no available backend found. ERR: ${n.map(t=>`[${t.name}] ${t.err}`).join(", ")}`);for(let{name:t,err:r}of n)i.includes(t)&&console.warn(`removing requested execution provider "${t}" from session options because it is not available: ${r}`);let u=r.filter(t=>o.has("string"==typeof t?t:t.name));return[s,new Proxy(t,{get:(t,r)=>"executionProviders"===r?u:Reflect.get(t,r)})]}}),_=l(()=>{y()}),$=l(()=>{b="1.26.0"}),x=l(()=>{$(),w="warning",Object.defineProperty(v={wasm:{},webgl:{},webgpu:{},versions:{common:b},set logLevel(e){if(void 0!==e){if("string"!=typeof e||-1===["verbose","info","warning","error","fatal"].indexOf(e))throw Error(`Unsupported logging level: ${e}`);w=e}},get logLevel(){return w}},"logLevel",{enumerable:!0})}),T=l(()=>{x(),S=v}),I=l(()=>{E=(t,r)=>{let i="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);i.width=t.dims[3],i.height=t.dims[2];let a=i.getContext("2d");if(null!=a){let s,n;r?.tensorLayout!==void 0&&"NHWC"===r.tensorLayout?(s=t.dims[2],n=t.dims[3]):(s=t.dims[3],n=t.dims[2]);let o=r?.format!==void 0?r.format:"RGB",u=r?.norm,l,d;void 0===u||void 0===u.mean?l=[255,255,255,255]:"number"==typeof u.mean?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],void 0!==u.mean[3]&&(l[3]=u.mean[3])),void 0===u||void 0===u.bias?d=[0,0,0,0]:"number"==typeof u.bias?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(d[3]=u.bias[3]));let p=n*s,c=0,h=p,f=2*p,m=-1;"RGBA"===o?(c=0,h=p,f=2*p,m=3*p):"RGB"===o?(c=0,h=p,f=2*p):"RBG"===o&&(c=0,f=p,h=2*p);for(let r=0;r<n;r++)for(let i=0;i<s;i++)a.fillStyle="rgba("+(t.data[c++]-d[0])*l[0]+","+(t.data[h++]-d[1])*l[1]+","+(t.data[f++]-d[2])*l[2]+","+(-1===m?255:(t.data[m++]-d[3])*l[3])+")",a.fillRect(i,r,1,1);if("toDataURL"in i)return i.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},k=(t,r)=>{let i="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),a;if(null!=i){let s,n,o;r?.tensorLayout!==void 0&&"NHWC"===r.tensorLayout?(s=t.dims[2],n=t.dims[1],o=t.dims[3]):(s=t.dims[3],n=t.dims[2],o=t.dims[1]);let u=void 0!==r&&void 0!==r.format?r.format:"RGB",l=r?.norm,d,p;void 0===l||void 0===l.mean?d=[255,255,255,255]:"number"==typeof l.mean?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],void 0!==l.mean[3]&&(d[3]=l.mean[3])),void 0===l||void 0===l.bias?p=[0,0,0,0]:"number"==typeof l.bias?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],void 0!==l.bias[3]&&(p[3]=l.bias[3]));let c=n*s;if(void 0!==r&&(void 0!==r.format&&4===o&&"RGBA"!==r.format||3===o&&"RGB"!==r.format&&"BGR"!==r.format))throw Error("Tensor format doesn't match input tensor dims");let h=0,f=1,m=2,g=3,y=0,_=c,b=2*c,$=-1;"RGBA"===u?(y=0,_=c,b=2*c,$=3*c):"RGB"===u?(y=0,_=c,b=2*c):"RBG"===u&&(y=0,b=c,_=2*c),a=i.createImageData(s,n);for(let r=0;r<n*s;h+=4,f+=4,m+=4,g+=4,r++)a.data[h]=(t.data[y++]-p[0])*d[0],a.data[f]=(t.data[_++]-p[1])*d[1],a.data[m]=(t.data[b++]-p[2])*d[2],a.data[g]=-1===$?255:(t.data[$++]-p[3])*d[3]}else throw Error("Can not access image data");return a}}),M=l(()=>{G(),C=(t,r)=>{if(void 0===t)throw Error("Image buffer must be defined");if(void 0===r.height||void 0===r.width)throw Error("Image height and width must be defined");if("NHWC"===r.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:i,width:a}=r,s=r.norm??{mean:255,bias:0},n,o;n="number"==typeof s.mean?[s.mean,s.mean,s.mean,s.mean]:[s.mean[0],s.mean[1],s.mean[2],s.mean[3]??255],o="number"==typeof s.bias?[s.bias,s.bias,s.bias,s.bias]:[s.bias[0],s.bias[1],s.bias[2],s.bias[3]??0];let u=void 0!==r.format?r.format:"RGBA",l=void 0!==r.tensorFormat&&void 0!==r.tensorFormat?r.tensorFormat:"RGB",d=i*a,p=new Float32Array("RGBA"===l?4*d:3*d),c=4,h=0,f=1,m=2,g=3,y=0,_=d,b=2*d,$=-1;"RGB"===u&&(c=3,h=0,f=1,m=2,g=-1),"RGBA"===l?$=3*d:"RBG"===l?(y=0,b=d,_=2*d):"BGR"===l&&(b=0,_=d,y=2*d);for(let r=0;r<d;r++,h+=c,m+=c,f+=c,g+=c)p[y++]=(t[h]+o[0])/n[0],p[_++]=(t[f]+o[1])/n[1],p[b++]=(t[m]+o[2])/n[2],-1!==$&&-1!==g&&(p[$++]=(t[g]+o[3])/n[3]);return"RGBA"===l?new W("float32",p,[1,4,i,a]):new W("float32",p,[1,3,i,a])},z=async(t,r)=>{let i="u">typeof HTMLImageElement&&t instanceof HTMLImageElement,a="u">typeof ImageData&&t instanceof ImageData,s="u">typeof ImageBitmap&&t instanceof ImageBitmap,n="string"==typeof t,o,u=r??{},l=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},d=t=>"u">typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||t instanceof OffscreenCanvas?t.getContext("2d"):null;if(i){let i=l();i.width=t.width,i.height=t.height;let a=d(i);if(null!=a){let i=t.height,s=t.width;if(void 0!==r&&void 0!==r.resizedHeight&&void 0!==r.resizedWidth&&(i=r.resizedHeight,s=r.resizedWidth),void 0!==r){if(u=r,void 0!==r.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=i,u.width=s}else u.tensorFormat="RGBA",u.height=i,u.width=s;a.drawImage(t,0,0),o=a.getImageData(0,0,s,i).data}else throw Error("Can not access image data")}else if(a){let i,a;if(void 0!==r&&void 0!==r.resizedWidth&&void 0!==r.resizedHeight?(i=r.resizedHeight,a=r.resizedWidth):(i=t.height,a=t.width),void 0!==r&&(u=r),u.format="RGBA",u.height=i,u.width=a,void 0!==r){let r=l();r.width=a,r.height=i;let s=d(r);if(null!=s)s.putImageData(t,0,0),o=s.getImageData(0,0,a,i).data;else throw Error("Can not access image data")}else o=t.data}else if(s){if(void 0===r)throw Error("Please provide image config with format for Imagebitmap");let i=l();i.width=t.width,i.height=t.height;let a=d(i);if(null!=a){let r=t.height,i=t.width;return a.drawImage(t,0,0,i,r),o=a.getImageData(0,0,i,r).data,u.height=r,u.width=i,C(o,u)}throw Error("Can not access image data")}else{if(n)return new Promise((r,i)=>{let a=l(),s=d(a);if(!t||!s)return i();let n=new Image;n.crossOrigin="Anonymous",n.src=t,n.onload=()=>{a.width=n.width,a.height=n.height,s.drawImage(n,0,0,a.width,a.height);let t=s.getImageData(0,0,a.width,a.height);u.height=a.height,u.width=a.width,r(C(t.data,u))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==o)return C(o,u);throw Error("Input data provided is not supported - aborted tensor creation")},A=(t,r)=>{let{width:i,height:a,download:s,dispose:n}=r;return new W({location:"texture",type:"float32",texture:t,dims:[1,a,i,4],download:s,dispose:n})},O=(t,r)=>{let{dataType:i,dims:a,download:s,dispose:n}=r;return new W({location:"gpu-buffer",type:i??"float32",gpuBuffer:t,dims:a,download:s,dispose:n})},R=(t,r)=>{let{dataType:i,dims:a,download:s,dispose:n}=r;return new W({location:"ml-tensor",type:i??"float32",mlTensor:t,dims:a,download:s,dispose:n})},B=(t,r,i)=>new W({location:"cpu-pinned",type:t,data:r,dims:i??[r.length]})}),L=l(()=>{D=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),P=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),U=!1,N=()=>{if(!U){U=!0;let t="u">typeof BigInt64Array&&BigInt64Array.from,r="u">typeof BigUint64Array&&BigUint64Array.from,i=globalThis.Float16Array,a="u">typeof i&&i.from;t&&(D.set("int64",BigInt64Array),P.set(BigInt64Array,"int64")),r&&(D.set("uint64",BigUint64Array),P.set(BigUint64Array,"uint64")),a?(D.set("float16",i),P.set(i,"float16")):D.set("float16",Uint16Array)}}}),F=l(()=>{G(),V=t=>{let r=1;for(let i=0;i<t.length;i++){let a=t[i];if("number"!=typeof a||!Number.isSafeInteger(a))throw TypeError(`dims[${i}] must be an integer, got: ${a}`);if(a<0)throw RangeError(`dims[${i}] must be a non-negative integer, got: ${a}`);r*=a}return r},q=(t,r)=>{switch(t.location){case"cpu":return new W(t.type,t.data,r);case"cpu-pinned":return new W({location:"cpu-pinned",data:t.data,type:t.type,dims:r});case"texture":return new W({location:"texture",texture:t.texture,type:t.type,dims:r});case"gpu-buffer":return new W({location:"gpu-buffer",gpuBuffer:t.gpuBuffer,type:t.type,dims:r});case"ml-tensor":return new W({location:"ml-tensor",mlTensor:t.mlTensor,type:t.type,dims:r});default:throw Error(`tensorReshape: tensor location ${t.location} is not supported`)}}}),G=l(()=>{I(),M(),L(),F(),W=class{constructor(t,r,i){let a,s;if(N(),"object"==typeof t&&"location"in t)switch(this.dataLocation=t.location,a=t.type,s=t.dims,t.location){case"cpu-pinned":{let r=D.get(a);if(!r)throw TypeError(`unsupported type "${a}" to create tensor from pinned buffer`);if(!(t.data instanceof r))throw TypeError(`buffer should be of type ${r.name}`);this.cpuData=t.data;break}case"texture":if("float32"!==a)throw TypeError(`unsupported type "${a}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break;case"gpu-buffer":if("float32"!==a&&"float16"!==a&&"int32"!==a&&"int64"!==a&&"uint32"!==a&&"uint8"!==a&&"bool"!==a&&"uint4"!==a&&"int4"!==a)throw TypeError(`unsupported type "${a}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break;case"ml-tensor":if("float32"!==a&&"float16"!==a&&"int32"!==a&&"int64"!==a&&"uint32"!==a&&"uint64"!==a&&"int8"!==a&&"uint8"!==a&&"bool"!==a&&"uint4"!==a&&"int4"!==a)throw TypeError(`unsupported type "${a}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let n,o;if("string"==typeof t)if(a=t,o=i,"string"===t){if(!Array.isArray(r))throw TypeError("A string tensor's data must be a string array.");n=r}else{let i=D.get(t);if(void 0===i)throw TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if("float16"===t&&i===Uint16Array||"uint4"===t||"int4"===t)throw TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${i.name} as data.`);n="uint64"===t||"int64"===t?i.from(r,BigInt):i.from(r)}else if(r instanceof i)n=r;else if(r instanceof Uint8ClampedArray)if("uint8"===t)n=Uint8Array.from(r);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===t&&r instanceof Uint16Array&&i!==Uint16Array)n=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw TypeError(`A ${a} tensor's data must be type of ${i}`)}else if(o=r,Array.isArray(t)){if(0===t.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let r=typeof t[0];if("string"===r)a="string",n=t;else if("boolean"===r)a="bool",n=Uint8Array.from(t);else throw TypeError(`Invalid element type of data array: ${r}.`)}else if(t instanceof Uint8ClampedArray)a="uint8",n=Uint8Array.from(t);else{let r=P.get(t.constructor);if(void 0===r)throw TypeError(`Unsupported type for tensor data: ${t.constructor}.`);a=r,n=t}if(void 0===o)o=[n.length];else if(!Array.isArray(o))throw TypeError("A tensor's dims must be a number array");s=o,this.cpuData=n,this.dataLocation="cpu"}let n=V(s);if(this.cpuData&&n!==this.cpuData.length&&("uint4"!==a&&"int4"!==a||Math.ceil(n/2)!==this.cpuData.length))throw Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=a,this.dims=s,this.size=n}static async fromImage(t,r){return z(t,r)}static fromTexture(t,r){return A(t,r)}static fromGpuBuffer(t,r){return O(t,r)}static fromMLTensor(t,r){return R(t,r)}static fromPinnedBuffer(t,r,i){return B(t,r,i)}toDataURL(t){return E(this,t)}toImageData(t){return k(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return q(this,t)}}}),H=l(()=>{G(),j=W}),ee=l(()=>{x(),K=(t,r)=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&console.timeStamp(`${t}::ORT::${r}`)},Z=(t,r)=>{let i=Error().stack?.split(/\r\n|\r|\n/g)||[],a=!1;for(let s=0;s<i.length;s++){if(a&&!i[s].includes("TRACE_FUNC")){let a=`FUNC_${t}::${i[s].trim().split(" ")[1]}`;r&&(a+=`::${r}`),K("CPU",a);return}i[s].includes("TRACE_FUNC")&&(a=!0)}},Q=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&Z("BEGIN",t)},X=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&Z("END",t)},Y=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&console.time(`ORT::${t}`)},J=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&console.timeEnd(`ORT::${t}`)}}),er=l(()=>{y(),H(),ee(),et=class t{constructor(t){this.handler=t}async run(t,r,i){Q(),Y("InferenceSession.run");let a={},s={};if("object"!=typeof t||null===t||t instanceof j||Array.isArray(t))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let n=!0;if("object"==typeof r){if(null===r)throw TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof j)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(0===r.length)throw TypeError("'fetches' cannot be an empty array.");for(let t of(n=!1,r)){if("string"!=typeof t)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(t))throw RangeError(`'fetches' contains invalid output name: ${t}.`);a[t]=null}if("object"==typeof i&&null!==i)s=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else{let t=!1,o=Object.getOwnPropertyNames(r);for(let i of this.outputNames)if(-1!==o.indexOf(i)){let s=r[i];(null===s||s instanceof j)&&(t=!0,n=!1,a[i]=s)}if(t){if("object"==typeof i&&null!==i)s=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else s=r}}else if("u">typeof r)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let r of this.inputNames)if(typeof t[r]>"u")throw Error(`input '${r}' is missing in 'feeds'.`);if(n)for(let t of this.outputNames)a[t]=null;let o=await this.handler.run(t,a,s),u={};for(let t in o)if(Object.hasOwnProperty.call(o,t)){let r=o[t];r instanceof j?u[t]=r:u[t]=new j(r.type,r.data,r.dims)}return J("InferenceSession.run"),X(),u}async release(){return this.handler.dispose()}static async create(r,i,a,s){Q(),Y("InferenceSession.create");let n,o={};if("string"==typeof r){if(n=r,"object"==typeof i&&null!==i)o=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if(r instanceof Uint8Array){if(n=r,"object"==typeof i&&null!==i)o=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if(r instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&r instanceof SharedArrayBuffer){let t=0,u=r.byteLength;if("object"==typeof i&&null!==i)o=i;else if("number"==typeof i){if(!Number.isSafeInteger(t=i))throw RangeError("'byteOffset' must be an integer.");if(t<0||t>=r.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${r.byteLength}).`);if(u=r.byteLength-t,"number"==typeof a){if(!Number.isSafeInteger(u=a))throw RangeError("'byteLength' must be an integer.");if(u<=0||t+u>r.byteLength)throw RangeError(`'byteLength' is out of range (0, ${r.byteLength-t}].`);if("object"==typeof s&&null!==s)o=s;else if("u">typeof s)throw TypeError("'options' must be an object.")}else if("u">typeof a)throw TypeError("'byteLength' must be a number.")}else if("u">typeof i)throw TypeError("'options' must be an object.");n=new Uint8Array(r,t,u)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await g(o),d=await u.createInferenceSessionHandler(n,l);return J("InferenceSession.create"),X(),new t(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),ea=l(()=>{er(),ei=et}),es=l(()=>{}),en=l(()=>{}),eo=l(()=>{}),eu=l(()=>{}),d(el={},{InferenceSession:()=>ei,TRACE:()=>K,TRACE_EVENT_BEGIN:()=>Y,TRACE_EVENT_END:()=>J,TRACE_FUNC_BEGIN:()=>Q,TRACE_FUNC_END:()=>X,Tensor:()=>j,env:()=>S,registerBackend:()=>f}),ed=l(()=>{_(),T(),ea(),H(),es(),en(),ee(),eo(),eu()}),ep=l(()=>{}),d(ec={},{default:()=>ef}),em=l(()=>{nO(),eR(),eE(),(eh=globalThis.self?.name==="ort-wasm-proxy-worker")&&(self.onmessage=t=>{let{type:r,in:i}=t.data;try{switch(r){case"init-wasm":eA(i.wasm).then(()=>{nw(i).then(()=>{postMessage({type:r})},t=>{postMessage({type:r,err:t})})},t=>{postMessage({type:r,err:t})});break;case"init-ep":{let{epName:t,env:a}=i;nv(a,t).then(()=>{postMessage({type:r})},t=>{postMessage({type:r,err:t})});break}case"copy-from":{let{buffer:t}=i,a=nT(t);postMessage({type:r,out:a});break}case"create":{let{model:t,options:a}=i;nE(t,a).then(t=>{postMessage({type:r,out:t})},t=>{postMessage({type:r,err:t})});break}case"release":nk(i),postMessage({type:r});break;case"run":{let{sessionId:t,inputIndices:a,inputs:s,outputIndices:n,options:o}=i;nC(t,a,s,n,Array(n.length).fill(null),o).then(t=>{t.some(t=>"cpu"!==t[3])?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:t},nA([...s,...t]))},t=>{postMessage({type:r,err:t})});break}case"end-profiling":nz(i),postMessage({type:r})}}catch(t){postMessage({type:r,err:t})}}),ef=eh?null:t=>new Worker(t??ey,{type:"classic",name:"ort-wasm-proxy-worker"})}),eE=l(()=>{ep(),eg=typeof location>"u"?void 0:location.origin,ey="u">typeof document?document.currentScript?.src:"u">typeof self?self.location?.href:void 0,e_=()=>{if(ey&&!ey.startsWith("blob:"))return ey.substring(0,ey.lastIndexOf("/")+1)},eb=(t,r)=>{try{let i=r??ey;return(i?new URL(t,i):new URL(t)).origin===eg}catch{return!1}},e$=async t=>{let r=await (await fetch(t,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},ew=async t=>(await import(t)).default,ev=(em(),p(ec)).default,ex=async()=>{if(!ey)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(eb(ey))return[void 0,ev()];let t=await e$(ey);return[t,ev(t)]},eS=void 0,eT=async(t,r,i,a)=>{let s=eS&&!(t||r);if(s)if(ey)s=eb(ey)||a&&!i;else if(a&&!i)s=!0;else throw Error("cannot determine the script source URL.");if(s)return[void 0,eS];{let a,s,n="ort-wasm-simd-threaded.jsep.mjs",o=t??((t,r)=>{let i=r??ey;try{return(i?new URL(t,i):new URL(t)).href}catch{return}})(n,r),u=i&&o&&!eb(o,r),l=u?await e$(o):o??(a=n,s=r,`${s??"./"}${a}`);return[u?l:void 0,await ew(l)]}}}),eR=l(()=>{eE(),eI=!1,eC=!1,ez=!1,eA=async t=>{if(eI)return Promise.resolve();if(eC)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(ez)throw Error("previous call to 'initializeWebAssembly()' failed.");eC=!0;let r=t.initTimeout,i=t.numThreads;if(!1!==t.simd){if("relaxed"===t.simd){if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}})())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}})())throw Error("WebAssembly SIMD is not supported in the current environment.")}let a=(()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}})();i>1&&!a&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),t.numThreads=i=1);let s=t.wasmPaths,n="string"==typeof s?s:void 0,o=s?.mjs,u=o?.href??o,l=s?.wasm,d=l?.href??l,p=t.wasmBinary,[c,h]=await eT(u,n,i>1,!!p||!!d),f=!1,m=[];if(r>0&&m.push(new Promise(t=>{setTimeout(()=>{f=!0,t()},r)})),m.push(new Promise((t,r)=>{let a={numThreads:i};if(p)a.wasmBinary=p,a.locateFile=t=>t;else if(d||n)a.locateFile=t=>d??n+t;else if(u&&0!==u.indexOf("blob:"))a.locateFile=t=>new URL(t,u).href;else if(c){let t=e_();t&&(a.locateFile=r=>t+r)}h(a).then(r=>{eC=!1,eI=!0,ek=r,t(),c&&URL.revokeObjectURL(c)},t=>{eC=!1,ez=!0,r(t)})})),await Promise.race(m),f)throw Error(`WebAssembly backend initializing failed due to timeout: ${r}ms`)},eO=()=>{if(eI&&ek)return ek;throw Error("WebAssembly is not initialized yet.")}}),eP=l(()=>{eR(),eB=(t,r)=>{let i=eO(),a=i.lengthBytesUTF8(t)+1,s=i._malloc(a);return i.stringToUTF8(t,s,a),r.push(s),s},eM=(t,r,i,a)=>{if("object"==typeof t&&null!==t){if(i.has(t))throw Error("Circular reference in options");i.add(t)}Object.entries(t).forEach(([t,s])=>{let n=r?r+t:t;if("object"==typeof s)eM(s,n+".",i,a);else if("string"==typeof s||"number"==typeof s)a(n,s.toString());else if("boolean"==typeof s)a(n,s?"1":"0");else throw Error(`Can't handle extra config type: ${typeof s}`)})},eD=t=>{let r=eO(),i=r.stackSave();try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);r._OrtGetLastError(a,a+i);let s=Number(r.getValue(a,4===i?"i32":"i64")),n=r.getValue(a+i,"*"),o=n?r.UTF8ToString(n):"";throw Error(`${t} ERROR_CODE: ${s}, ERROR_MESSAGE: ${o}`)}finally{r.stackRestore(i)}}}),eN=l(()=>{eR(),eP(),eU=t=>{let r=eO(),i=0,a=[],s=t||{};try{if(t?.logSeverityLevel===void 0)s.logSeverityLevel=2;else if("number"!=typeof t.logSeverityLevel||!Number.isInteger(t.logSeverityLevel)||t.logSeverityLevel<0||t.logSeverityLevel>4)throw Error(`log severity level is not valid: ${t.logSeverityLevel}`);if(t?.logVerbosityLevel===void 0)s.logVerbosityLevel=0;else if("number"!=typeof t.logVerbosityLevel||!Number.isInteger(t.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${t.logVerbosityLevel}`);t?.terminate===void 0&&(s.terminate=!1);let n=0;return t?.tag!==void 0&&(n=eB(t.tag,a)),i=r._OrtCreateRunOptions(s.logSeverityLevel,s.logVerbosityLevel,!!s.terminate,n),0===i&&eD("Can't create run options."),t?.extra!==void 0&&eM(t.extra,"",new WeakSet,(t,s)=>{let n=eB(t,a),o=eB(s,a);0!==r._OrtAddRunConfigEntry(i,n,o)&&eD(`Can't set a run config entry: ${t} - ${s}.`)}),[i,a]}catch(t){throw 0!==i&&r._OrtReleaseRunOptions(i),a.forEach(t=>r._free(t)),t}}}),eF=l(()=>{eR(),eP(),eL=(t,r,i,a)=>{let s=eB(r,a),n=eB(i,a);0!==eO()._OrtAddSessionConfigEntry(t,s,n)&&eD(`Can't set a session config entry: ${r} - ${i}.`)},eV=async(t,r,i)=>{for(let a of r.executionProviders){let r="string"==typeof a?a:a.name,s=[];switch(r){case"webnn":if(r="WEBNN",eL(t,"session.disable_quant_qdq","1",i),eL(t,"session.disable_qdq_constant_folding","1",i),"string"!=typeof a){let r=a?.deviceType;r&&eL(t,"deviceType",r,i)}break;case"webgpu":if(r="JS","string"!=typeof a&&a?.preferredLayout){if("NCHW"!==a.preferredLayout&&"NHWC"!==a.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);eL(t,"preferredLayout",a.preferredLayout,i)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${r}`)}let n=eB(r,i),o=s.length,u=0,l=0;if(o>0){u=eO()._malloc(o*eO().PTR_SIZE),i.push(u),l=eO()._malloc(o*eO().PTR_SIZE),i.push(l);for(let t=0;t<o;t++)eO().setValue(u+t*eO().PTR_SIZE,s[t][0],"*"),eO().setValue(l+t*eO().PTR_SIZE,s[t][1],"*")}await eO()._OrtAppendExecutionProvider(t,n,u,l,o)!==0&&eD(`Can't append execution provider: ${r}.`)}},eq=async t=>{var r;let i,a=eO(),s=0,n=[],o=t||{};(r=o).extra||(r.extra={}),r.extra.session||(r.extra.session={}),(i=r.extra.session).use_ort_model_bytes_directly||(i.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(t=>("string"==typeof t?t:t.name)==="webgpu")&&(r.enableMemPattern=!1);try{let t=(t=>{switch(t){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${t}`)}})(o.graphOptimizationLevel??"all"),r=(t=>{switch(t){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${t}`)}})(o.executionMode??"sequential"),i="string"==typeof o.logId?eB(o.logId,n):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log severity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw Error(`log verbosity level is not valid: ${l}`);let d="string"==typeof o.optimizedModelFilePath?eB(o.optimizedModelFilePath,n):0;if(s=a._OrtCreateSessionOptions(t,!!o.enableCpuMemArena,!!o.enableMemPattern,r,!!o.enableProfiling,0,i,u,l,d),0===s&&eD("Can't create session options."),o.executionProviders&&await eV(s,o,n),void 0!==o.enableGraphCapture){if("boolean"!=typeof o.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);eL(s,"enableGraphCapture",o.enableGraphCapture.toString(),n)}if(o.freeDimensionOverrides)for(let[t,r]of Object.entries(o.freeDimensionOverrides)){if("string"!=typeof t)throw Error(`free dimension override name must be a string: ${t}`);if("number"!=typeof r||!Number.isInteger(r)||r<0)throw Error(`free dimension override value must be a non-negative integer: ${r}`);let i=eB(t,n);0!==a._OrtAddFreeDimensionOverride(s,i,r)&&eD(`Can't set a free dimension override: ${t} - ${r}.`)}return void 0!==o.extra&&eM(o.extra,"",new WeakSet,(t,r)=>{eL(s,t,r,n)}),[s,n]}catch(t){throw 0!==s&&0!==a._OrtReleaseSessionOptions(s)&&eD("Can't release session options."),n.forEach(t=>a._free(t)),t}}}),eY=l(()=>{eW=t=>{switch(t){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${t}`)}},eG=t=>{switch(t){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${t}`)}},ej=(t,r)=>{let i=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][t],a="number"==typeof r?r:r.reduce((t,r)=>t*r,1);return i>0?Math.ceil(a*i):void 0},eH=t=>{switch(t){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${t}`)}},eK=t=>{switch(t){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${t}`)}},eZ=t=>"float32"===t||"float16"===t||"int32"===t||"int64"===t||"uint32"===t||"uint8"===t||"bool"===t||"uint4"===t||"int4"===t,eQ=t=>"float32"===t||"float16"===t||"int32"===t||"int64"===t||"uint32"===t||"uint64"===t||"int8"===t||"uint8"===t||"bool"===t||"uint4"===t||"int4"===t,eX=t=>{switch(t){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${t}`)}}}),e0=l(()=>{ep(),eJ=async t=>{if("string"!=typeof t)return t instanceof Blob?new Uint8Array(await t.arrayBuffer()):t instanceof Uint8Array?t:new Uint8Array(t);{let r=await fetch(t);if(!r.ok)throw Error(`failed to load external data file: ${t}`);let i=r.headers.get("Content-Length"),a=i?parseInt(i,10):0;if(a<0x40000000)return new Uint8Array(await r.arrayBuffer());{if(!r.body)throw Error(`failed to load external data file: ${t}, no response body.`);let i=r.body.getReader(),s;try{s=new ArrayBuffer(a)}catch(t){if(t instanceof RangeError){let t=Math.ceil(a/65536);s=new WebAssembly.Memory({initial:t,maximum:t}).buffer}else throw t}let n=0;for(;;){let{done:t,value:r}=await i.read();if(t)break;let a=r.byteLength;new Uint8Array(s,n,a).set(r),n+=a}return new Uint8Array(s,0,a)}}}}),e8=l(()=>{eY(),e1=["V","I","W","E","F"],e4=(t,r)=>{e2=t,e3=r},e6=(...t)=>{e3&&((t,r)=>{var i,a;let s=eK(t);s>=eK(e2)&&(i=s,a="function"==typeof r?r():r,console.log(`[${e1[i]},${new Date().toISOString()}]${a}`))})(...t)}}),ta=l(()=>{e5=class{static calcMatMulShape(t,r){return t[1]!==r[0]?void 0:[t[0],r[1]]}},e7=class{static calcShape(t,r,i=!1){let a=t.length,s=r.length;if(0===a)return r;if(0===s)return t;let n=Math.max(t.length,r.length),o=Array(n);if(i){if(a<2||s<2)return;let i=e5.calcMatMulShape([t[a-2],t[a-1]],[r[s-2],r[s-1]]);if(void 0===i)return;[o[n-2],o[n-1]]=i}for(let u=i?3:1;u<=n;u++){let i=a-u<0?1:t[a-u],l=s-u<0?1:r[s-u];if(i!==l&&i>1&&l>1)return;let d=Math.max(i,l);if(i&&l)o[n-u]=Math.max(i,l);else{if(d>1)return;o[n-u]=0}}return o}static isValidBroadcast(t,r){let i=t.length,a=r.length;if(i>a)return!1;for(let s=1;s<=i;s++)if(1!==t[i-s]&&t[i-s]!==r[a-s])return!1;return!0}},e9=class t{static size(r){return t.getSizeFromDimensionRange(r,0,r.length)}static convertShape(t,r=4){let i=t.length;if(0===i)return[];let a=Array(i),s=i-1;for(;s>=0;){if(t[s]%r==0){a[s]=t[s]/r;break}if(r%t[s]!=0)throw Error("cannot convert shape");a[s]=1,r/=t[s],s--}for(s--;s>=0;s--)a[s]=t[s];return a}static sizeFromDimension(r,i){if(i<0||i>r.length)throw Error(`invalid dimension of ${i} for sizeFromDimension as Tensor has ${r.length} dimensions.`);return t.getSizeFromDimensionRange(r,i,r.length)}static sizeToDimension(r,i){if(i<0||i>r.length)throw Error(`invalid dimension of ${i} for sizeToDimension as Tensor has ${r.length} dimensions.`);return t.getSizeFromDimensionRange(r,0,i)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let s=r;s<i;s++){if(t[s]<0)throw Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[s])}return a}static computeStrides(t){let r=t.length;if(0===r)return[];if(1===r)return[1];let i=Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(r=>t[r]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((t,a)=>t+r[a]+r[a+i])}static areEqual(t,r){return t.length===r.length&&t.every((t,i)=>t===r[i])}},te=class t{static adjustPoolAttributes(t,r,i,a,s,n){if(!t&&i.length!==r.length-2)throw Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let t=0;t<r.length-2;t++)t>=i.length?i.push(r[t+2]):i[t]=r[t+2];for(let t=0;t<i.length;t++)if(t<a.length){if(a[t]<0)throw Error("strides should be greater than or equal to 1")}else a.push(1);for(let t=0;t<i.length;t++)if(t<s.length){if(s[t]<0)throw Error("dilations should be greater than or equal to 1")}else s.push(1);for(let t=0;t<2*i.length;t++)if(t<n.length){if(n[t]<0)throw Error("pad should be greater than or equal to 1")}else n.push(0);for(let t=0;t<i.length;t++){if(i[t]<=0)throw Error("kernel shapes need to be greater than 0");if(n[t]>=i[t]||n[t+i.length]>=i[t])throw Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(r,i,a,s,n,o,u){if(u){if(n.length!==2*(r.length-2))throw Error("length of pads should be twice the length of data dimensions");if(i.length!==r.length-2)throw Error("length of strides should be the length of data dimensions");if(s.length!==r.length-2)throw Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<r.length-2;l++)t.adjustPadAndReturnShape(r[l+(o?1:2)],i[l],a[l],s[l],n,l,l+r.length-2,u)}}static computePoolOutputShape(r,i,a,s,n,o,u){if(i.length<=0)throw Error("input shape must be of size greater than 0");let l=[i[0],i[1]];return t.computeShapeHelper(r,i,l,a,s,n,o,u),l}static computeConvOutputShape(r,i,a,s,n,o,u){if(r.length<=0||i.length<=0)throw Error("invalid input tensor dims or invalid filter tensor dims");let l=[r[0],i[0]];return t.computeShapeHelper(!1,r,l,a,s,n,o,u),l}static computeShapeHelper(r,i,a,s,n,o,u,l){if(r)for(let t=0;t<i.length-2;t++)a.push(1);else for(let r=0;r<i.length-2;r++)a.push(t.adjustPadAndReturnShape(i[r+2],s[r],n[r],o[r],u,r,r+i.length-2,l))}static adjustPadAndReturnShape(t,r,i,a,s,n,o,u){let l=i*(a-1)+1;if(!u||"NOTSET"===u)return Math.floor((t+s[n]+s[o]-l)/r+1);switch(u){case"VALID":return s[n]=0,s[o]=0,Math.floor((t-l)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(1!==i)throw Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let i=((t+r-1)/r-1)*r+a-t;return s[n]=Math.floor("SAME_LOWER"===u?(i+1)/2:i/2),s[o]=i-s[n],Math.floor((t+i-a)/r+1)}default:throw Error("Unsupported AutoPad type")}}},tt=class{static getShapeOfGemmResult(t,r,i,a,s){let n,o,u;if(2!==t.length||2!==i.length)throw Error("shape need to be of size 2");r?(n=t[1],o=t[0]):(n=t[0],o=t[1]);let l=-1;if(a?(u=i[0],l=1):(u=i[1],l=0),i[l]!==o)throw Error("dimension mismatch");if(n<=0||u<=0||o<=0)throw Error("invalid shape specified");if(s&&!e7.isValidBroadcast(s,[n,u]))throw Error("gemm: invalid bias shape for broadcast");return[n,u,o]}},tr=-34028234663852886e22,ti=34028234663852886e22}),tn=l(()=>{eY(),ts=(t,r)=>new(eH(r))(t)}),t_=l(()=>{eY(),e8(),to=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),tu=(t,r)=>{if("int32"===r)return t;let i=to.get(r);if(!i)throw Error(`WebNN backend does not support data type: ${r}`);let a=i/8;if(t.byteLength%a!=0)throw Error(`Invalid Uint8Array length - must be a multiple of ${a}.`);let s=t.byteLength/a,n=new(eH(r))(t.buffer,t.byteOffset,s);switch(r){case"int64":case"uint64":{let t=new Int32Array(s);for(let r=0;r<s;r++){let i=n[r];if(i>2147483647n||i<-2147483648n)throw Error("Can not convert int64 data to int32 - value out of range.");t[r]=Number(i)}return new Uint8Array(t.buffer)}case"int8":case"uint8":case"uint32":if("uint32"===r&&n.some(t=>t>0x7fffffff))throw Error("Can not convert uint32 data to int32 - value out of range.");return new Uint8Array(Int32Array.from(n,Number).buffer);default:throw Error(`Unsupported data conversion from ${r} to 'int32'`)}},tl=(t,r)=>{if("int32"===r)return t;if(t.byteLength%4!=0)throw Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let i=t.byteLength/4,a=new Int32Array(t.buffer,t.byteOffset,i);switch(r){case"int64":return new Uint8Array(BigInt64Array.from(a,BigInt).buffer);case"uint64":if(a.some(t=>t<0))throw Error("Can not convert int32 data to uin64 - negative value found.");return new Uint8Array(BigUint64Array.from(a,BigInt).buffer);case"int8":if(a.some(t=>t<-128||t>127))throw Error("Can not convert int32 data to int8 - value out of range.");return new Uint8Array(Int8Array.from(a,Number).buffer);case"uint8":if(a.some(t=>t<0||t>255))throw Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(a,Number);case"uint32":if(a.some(t=>t<0))throw Error("Can not convert int32 data to uint32 - negative value found.");return new Uint8Array(Uint32Array.from(a,Number).buffer);default:throw Error(`Unsupported data conversion from 'int32' to ${r}`)}},td=1,tp=()=>td++,tc=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),th=(t,r)=>{let i=to.get(t);if(!i)throw Error(`WebNN backend does not support data type: ${t}`);return r.length>0?Math.ceil(r.reduce((t,r)=>t*r)*i/8):0},tf=class{constructor(t){this.isDataConverted=!1;let{sessionId:r,context:i,tensor:a,dataType:s,shape:n,fallbackDataType:o}=t;this.sessionId=r,this.mlContext=i,this.mlTensor=a,this.dataType=s,this.tensorShape=n,this.fallbackDataType=o}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return th(this.dataType,this.tensorShape)}destroy(){e6("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(t){this.mlContext.writeTensor(this.mlTensor,t)}async read(t){if(!this.fallbackDataType)return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor);{let r=tl(new Uint8Array(await this.mlContext.readTensor(this.mlTensor)),this.dataType);return t?void(t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)).set(r):r.buffer}}canReuseTensor(t,r,i){return this.mlContext===t&&this.dataType===r&&this.tensorShape.length===i.length&&this.tensorShape.every((t,r)=>t===i[r])}setIsDataConverted(t){this.isDataConverted=t}},tm=class{constructor(t,r){this.tensorManager=t,this.wrapper=r}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(t,r,i,a){let s=this.tensorManager.getMLContext(t),n=this.tensorManager.getMLOpSupportLimits(t),o;if(!n?.input.dataTypes.includes(r)){if(!(o=tc.get(r))||n?.input.dataTypes.includes(o))throw Error(`WebNN backend does not support data type: ${r}`);e6("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${r} to ${o}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(s,r,i))return this.wrapper.tensor;if(a){if(this.wrapper.byteLength!==th(r,i))throw Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(t,r,i,u,!0,!0,o),a&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(t){let r=t;if(this.wrapper){if(this.wrapper.fallbackType)if("int32"===this.wrapper.fallbackType)r=tu(t,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(t.byteLength===this.wrapper.byteLength)return void this.wrapper.write(r);e6("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(r):this.activeUpload=new Uint8Array(r)}async download(t){if(this.activeUpload){let r=this.wrapper?.isDataConverted?tl(this.activeUpload,this.wrapper?.type):this.activeUpload;return t?void(t instanceof ArrayBuffer?new Uint8Array(t).set(r):new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(r)):r.buffer}if(!this.wrapper)throw Error("Tensor has not been created.");return t?this.wrapper.read(t):this.wrapper.read()}},tg=class{constructor(t){this.backend=t,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(t){let r=this.backend.getMLContext(t);if(!r)throw Error("MLContext not found for session.");return r}getMLOpSupportLimits(t){return this.backend.getMLOpSupportLimits(t)}reserveTensorId(){let t=tp();return this.tensorTrackersById.set(t,new tm(this)),t}releaseTensorId(t){let r=this.tensorTrackersById.get(t);r&&(this.tensorTrackersById.delete(t),r.tensorWrapper&&this.releaseTensor(r.tensorWrapper))}async ensureTensor(t,r,i,a,s){e6("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${r}, dataType: ${i}, shape: ${a}, copyOld: ${s}}`);let n=this.tensorTrackersById.get(r);if(!n)throw Error("Tensor not found.");return n.ensureTensor(t,i,a,s)}upload(t,r){let i=this.tensorTrackersById.get(t);if(!i)throw Error("Tensor not found.");i.upload(r)}async download(t,r){e6("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${t}, dstBuffer: ${r?.byteLength}}`);let i=this.tensorTrackersById.get(t);if(!i)throw Error("Tensor not found.");return i.download(r)}releaseTensorsForSession(t){for(let r of this.freeTensors)r.sessionId===t&&r.destroy();this.freeTensors=this.freeTensors.filter(r=>r.sessionId!==t)}registerTensor(t,r,i,a){let s=this.getMLContext(t),n=tp(),o=new tf({sessionId:t,context:s,tensor:r,dataType:i,shape:a});return this.tensorTrackersById.set(n,new tm(this,o)),this.externalTensors.add(o),n}async getCachedTensor(t,r,i,a,s,n,o){let u=this.getMLContext(t);for(let[a,s]of this.freeTensors.entries())if(s.canReuseTensor(u,r,i)){e6("verbose",()=>`[WebNN] Reusing tensor {dataType: ${r}, ${o?`fallbackDataType: ${o},`:""} shape: ${i}`);let s=this.freeTensors.splice(a,1)[0];return s.sessionId=t,s}e6("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${r}, ${o?`fallbackDataType: ${o},`:""} shape: ${i}}`);let l=await u.createTensor({dataType:o??r,shape:i,dimensions:i,usage:a,writable:s,readable:n});return new tf({sessionId:t,context:u,tensor:l,dataType:r,shape:i,fallbackDataType:o})}releaseTensor(t){this.externalTensors.has(t)&&this.externalTensors.delete(t),this.freeTensors.push(t)}},ty=(...t)=>new tg(...t)}),tw=l(()=>{eY(),eR(),tn(),t_(),e8(),tb=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),t$=class{constructor(t){this.tensorManager=ty(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,this.mlOpSupportLimitsBySessionId=new Map,e4(t.logLevel,!!t.debug)}get currentSessionId(){if(void 0===this.activeSessionId)throw Error("No active session");return this.activeSessionId}onRunStart(t){e6("verbose",()=>`[WebNN] onRunStart {sessionId: ${t}}`),this.activeSessionId=t}onRunEnd(t){e6("verbose",()=>`[WebNN] onRunEnd {sessionId: ${t}}`);let r=this.temporarySessionTensorIds.get(t);if(r){for(let t of r)e6("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t);this.temporarySessionTensorIds.delete(t),this.activeSessionId=void 0}}async createMLContext(t){if(t instanceof GPUDevice){let r=this.mlContextCache.findIndex(r=>r.gpuDevice===t);if(-1!==r)return this.mlContextCache[r].mlContext;{let r=await navigator.ml.createContext(t);return this.mlContextCache.push({gpuDevice:t,mlContext:r}),r}}if(void 0===t){let t=this.mlContextCache.findIndex(t=>void 0===t.options&&void 0===t.gpuDevice);if(-1!==t)return this.mlContextCache[t].mlContext;{let t=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:t}),t}}let r=this.mlContextCache.findIndex(r=>((t,r)=>{if(t===r)return!0;if(void 0===t||void 0===r)return!1;let i=Object.keys(t).sort(),a=Object.keys(r).sort();return i.length===a.length&&i.every((i,s)=>i===a[s]&&t[i]===r[i])})(r.options,t));if(-1!==r)return this.mlContextCache[r].mlContext;{let r=await navigator.ml.createContext(t);return this.mlContextCache.push({options:t,mlContext:r}),r}}registerMLContext(t,r){this.mlContextBySessionId.set(t,r);let i=this.sessionIdsByMLContext.get(r);i||(i=new Set,this.sessionIdsByMLContext.set(r,i)),i.add(t),this.mlOpSupportLimitsBySessionId.has(t)||this.mlOpSupportLimitsBySessionId.set(t,r.opSupportLimits()),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(t,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(t,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(t){this.sessionGraphInputs.delete(t),this.sessionGraphOutputs.delete(t);let r=this.mlContextBySessionId.get(t);if(!r)return;this.tensorManager.releaseTensorsForSession(t),this.mlContextBySessionId.delete(t),this.mlOpSupportLimitsBySessionId.delete(t);let i=this.sessionIdsByMLContext.get(r);if(i.delete(t),0===i.size){this.sessionIdsByMLContext.delete(r);let t=this.mlContextCache.findIndex(t=>t.mlContext===r);-1!==t&&this.mlContextCache.splice(t,1)}}getMLContext(t){return this.mlContextBySessionId.get(t)}getMLOpSupportLimits(t){return this.mlOpSupportLimitsBySessionId.get(t)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(t){e6("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${t}}`),this.tensorManager.releaseTensorId(t)}async ensureTensor(t,r,i,a,s){let n=tb.get(i);if(!n)throw Error(`Unsupported ONNX data type: ${i}`);return this.tensorManager.ensureTensor(t??this.currentSessionId,r,n,a,s)}async createTemporaryTensor(t,r,i){e6("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${r}, shape: ${i}}`);let a=tb.get(r);if(!a)throw Error(`Unsupported ONNX data type: ${r}`);let s=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(t,s,a,i,!1);let n=this.temporarySessionTensorIds.get(t);return n?n.push(s):this.temporarySessionTensorIds.set(t,[s]),s}uploadTensor(t,r){if(!eO().shouldTransferToMLTensor)throw Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");e6("verbose",()=>`[WebNN] uploadTensor {tensorId: ${t}, data: ${r.byteLength}}`),this.tensorManager.upload(t,r)}async downloadTensor(t,r){return this.tensorManager.download(t,r)}createMLTensorDownloader(t,r){return async()=>{let i=await this.tensorManager.download(t);return ts(i,r)}}registerMLTensor(t,r,i,a){let s=tb.get(i);if(!s)throw Error(`Unsupported ONNX data type: ${i}`);let n=this.tensorManager.registerTensor(t,r,s,a);return e6("verbose",()=>`[WebNN] registerMLTensor {tensor: ${r}, dataType: ${s}, dimensions: ${a}} -> {tensorId: ${n}}`),n}registerMLConstant(t,r,i,a,s,n,o=!1){if(!n)throw Error("External mounted files are not available.");let u=t;t.startsWith("./")&&(u=t.substring(2));let l=n.get(u);if(!l)throw Error(`File with name ${u} not found in preloaded files.`);if(r+i>l.byteLength)throw Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(r,r+i).buffer,p;switch(s.dataType){case"float32":p=new Float32Array(d);break;case"float16":p="u">typeof Float16Array&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":p=new Int32Array(d);break;case"uint32":p=new Uint32Array(d);break;case"int64":o?(p=new Int32Array(tu(new Uint8Array(d),"int64").buffer),s.dataType="int32"):p=new BigInt64Array(d);break;case"uint64":p=new BigUint64Array(d);break;case"int8":p=new Int8Array(d);break;case"int4":case"uint4":case"uint8":p=new Uint8Array(d);break;default:throw Error(`Unsupported data type: ${s.dataType} in creating WebNN Constant from external data.`)}return e6("verbose",()=>`[WebNN] registerMLConstant {dataType: ${s.dataType}, shape: ${s.shape}}} ${o?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),a.constant(s,p)}registerGraphInput(t){this.temporaryGraphInputs.push(t)}registerGraphOutput(t){this.temporaryGraphOutputs.push(t)}isGraphInput(t,r){let i=this.sessionGraphInputs.get(t);return!!i&&i.includes(r)}isGraphOutput(t,r){let i=this.sessionGraphOutputs.get(t);return!!i&&i.includes(r)}isGraphInputOutputTypeSupported(t,r,i=!0){let a=tb.get(eW(r)),s=this.mlOpSupportLimitsBySessionId.get(t);return!(typeof a>"u")&&(i?!!s?.input.dataTypes.includes(a):!!s?.output.dataTypes.includes(a))}flush(){}}}),tv=l(()=>{}),tA=l(()=>{e8(),tv(),tx=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[0xc00000,10],[0x1000000,10],[0x1900000,15],[0x2000000,22],[0x2a30000,2],[0x3840000,6],[0x4000000,6],[0x8000000,6],[0xa000000,6]]),tS=[],tT=t=>16*Math.ceil(Number(t)/16),tE=1,tk=()=>tE++,tI=async(t,r,i,a)=>{let s=tT(i),n=t.device.createBuffer({size:s,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let o=t.getCommandEncoder();t.endComputePass(),o.copyBufferToBuffer(r,0,n,0,s),t.flush(),await n.mapAsync(GPUMapMode.READ);let u=n.getMappedRange();if(!a)return new Uint8Array(u.slice(0,i));{let t=a();return t.set(new Uint8Array(u,0,i)),t}}finally{n.destroy()}},tC=class{constructor(t){for(let[r]of(this.backend=t,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map,tx))tS.push(r),this.freeBuffers.set(r,[]),this.freeUniformBuffers.set(r,[]);this.sessionCount=0}upload(t,r){let i=r.buffer,a=r.byteOffset,s=r.byteLength,n=tT(s),o=this.storageCache.get(t);if(!o)throw Error("gpu data for uploading does not exist");if(Number(o.originalSize)!==s)throw Error(`inconsistent data size. gpu data size=${o.originalSize}, data size=${s}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:n,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC});new Uint8Array(u.getMappedRange()).set(new Uint8Array(i,a,s)),u.unmap();let l=this.backend.device.createCommandEncoder();l.copyBufferToBuffer(u,0,o.gpuData.buffer,0,n),this.backend.device.queue.submit([l.finish()]),u.destroy(),e6("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${t})`)}memcpy(t,r){let i=this.storageCache.get(t);if(!i)throw Error("source gpu data for memcpy does not exist");let a=this.storageCache.get(r);if(!a)throw Error("destination gpu data for memcpy does not exist");if(i.originalSize!==a.originalSize)throw Error("inconsistent source and destination gpu data size");let s=tT(i.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(i.gpuData.buffer,0,a.gpuData.buffer,0,s)}registerExternalBuffer(t,r,i){let a;if(i){if(a=i[0],t===i[1])return e6("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${a}, buffer is the same, skip.`),a;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else a=tk();return this.storageCache.set(a,{gpuData:{id:a,type:0,buffer:t},originalSize:r}),e6("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${r}) => id=${a}, registered.`),a}unregisterExternalBuffer(t){void 0!==t&&(this.storageCache.delete(t),e6("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${t}`))}create(t,r=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let i=(t=>{for(let r=0;r<tS.length;r++){let i=tS[r];if(t<=i)return i}return 16*Math.ceil(t/16)})(t),a,s=(r&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(r&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(s||n){let t=(s?this.freeBuffers:this.freeUniformBuffers).get(i);a=t&&t.length>0?t.pop():this.backend.device.createBuffer({size:i,usage:r})}else a=this.backend.device.createBuffer({size:i,usage:r});let o={id:tk(),type:0,buffer:a};return this.storageCache.set(o.id,{gpuData:o,originalSize:Number(t)}),e6("verbose",()=>`[WebGPU] GpuDataManager.create(size=${t}) => id=${o.id}`),o}get(t){return this.storageCache.get(t)?.gpuData}release(t){let r="bigint"==typeof t?Number(t):t,i=this.storageCache.get(r);if(!i){if(0===this.storageCache.size)return 0;throw Error("releasing data does not exist")}return e6("verbose",()=>`[WebGPU] GpuDataManager.release(id=${r}), gpuDataId=${i.gpuData.id}`),this.storageCache.delete(r),this.buffersPending.push(i.gpuData.buffer),i.originalSize}async download(t,r){let i=this.storageCache.get(Number(t));if(!i)throw Error("data does not exist");await tI(this.backend,i.gpuData.buffer,i.originalSize,r)}refreshPendingBuffers(){if(0!==this.buffersPending.length)if("default"===this.backend.sessionStatus){for(let t of this.buffersPending){let r=tx.get(t.size);if((t.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let i=this.freeBuffers.get(t.size)||[];void 0===r||i.length>=r?t.destroy():i.push(t)}else if((t.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let i=this.freeUniformBuffers.get(t.size)||[];void 0===r||i.length>=r?t.destroy():i.push(t)}else t.destroy()}this.buffersPending=[]}else{let t=this.capturedPendingBuffers.get(this.backend.currentSessionId);for(let r of(t||(t=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,t)),this.buffersPending))t.push(r);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(t=>{t.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(t=>{t.forEach(t=>{t.destroy()})}),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(t=>{t.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(t){let r=this.capturedPendingBuffers.get(t);r&&(r.forEach(t=>{t.destroy()}),this.capturedPendingBuffers.delete(t)),this.sessionCount-=1,0===this.sessionCount&&(e6("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(t=>{t.gpuData.buffer.destroy()}),this.storageCache=new Map)}},tz=(...t)=>new tC(...t)}),tB=l(()=>{tO=class{constructor(t){Object.assign(this,t)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(t=>`${this[t]}`).join(";")),this.key}},tR=t=>new tO(t)}),tY=l(()=>{eY(),ta(),tM=64,tD=(t,r)=>{if(3===r)throw Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(t)){case 10:return r>1?`vec${r}<f16>`:"f16";case 1:return r>1?`vec${r}<f32>`:"f32";case 6:return r>1?`vec${r}<i32>`:"i32";case 12:return r>1?`vec${r}<u32>`:"u32";case 7:if(r>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(r>1)throw Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(4!==r)throw Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw Error(`Unknown data type: ${t}`)}},tP=(t,r=1)=>{let i=tD(t,r);return"string"==typeof i?i:i[0]},tU=(t,r=1)=>{let i=tD(t,r);return"string"==typeof i?i:i[1]},tN=(...t)=>{let r=[];return t.forEach(t=>{0!==t.length&&r.push({type:12,data:t},{type:12,data:e9.computeStrides(t)})}),r},tL=t=>t%4==0?4:t%2==0?2:1,tV=(t="f32",r,i="0")=>r&&1!==r?`vec${r}<${t}>(${i})`:`${t}(${i})`,tq=(t,r,i)=>"f32"===t?i:1===r?`f32(${i})`:`vec${r}<f32>(${i})`,tF=(t,r)=>4===r?`(${t}.x + ${t}.y + ${t}.z + ${t}.w)`:2===r?`(${t}.x + ${t}.y)`:3===r?`(${t}.x + ${t}.y + ${t}.z)`:t,tW=(t,r,i,a)=>t.startsWith("uniforms.")&&i>4?"string"==typeof r?"f16"===a?`${t}[(${r}) / 8][(${r}) % 8 / 4][(${r}) % 8 % 4]`:`${t}[(${r}) / 4][(${r}) % 4]`:"f16"===a?`${t}[${Math.floor(r/8)}][${Math.floor(r%8/4)}][${r%8%4}]`:`${t}[${Math.floor(r/4)}][${r%4}]`:i>1?`${t}[${r}]`:t,tG=(t,r,i,a,s)=>{let n,o,u,l,d="number"==typeof i,p=d?i:i.length,c=[...Array(p).keys()],h=p<2?"u32":p<=4?`vec${p}<u32>`:`array<u32, ${p}>`,f=tD(r,s),m="string"==typeof f?f:f[1],g={indices:h,value:m,storage:"string"==typeof f?f:f[0],tensor:r},y=t=>"string"==typeof t?t:`${t}u`,_={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},b=d?"uniforms.":"",$=`${b}${t}_shape`,w=`${b}${t}_strides`,v="";for(let t=0;t<p-1;t++)v+=`
    let dim${t} = current / ${tW(w,t,p)};
    let rest${t} = current % ${tW(w,t,p)};
    indices[${t}] = dim${t};
    current = rest${t};
    `;v+=`indices[${p-1}] = current;`;let x=p<2?"":`
  fn o2i_${t}(offset: u32) -> ${g.indices} {
    var indices: ${g.indices};
    var current = offset;
    ${v}
    return indices;
  }`,S=[];if(p>=2)for(let t=p-1;t>=0;t--)S.push(`${tW(w,t,p)} * (indices[${t}])`);let T=p<2?"":`
  fn i2o_${t}(indices: ${g.indices}) -> u32 {
    return ${S.join("+")};
  }`,E=(...t)=>0===p?"0u":`${g.indices}(${t.map(y).join(",")})`,k=(t,r)=>p<2?`${t}`:`${tW(t,r,p)}`,I={},C=(r,i)=>(()=>{if(g.storage===g.value)return`${t}[${r}]=${i};`;if("vec2<u32>"===g.storage&&"i32"===g.value)return`${t}[${r}]=vec2<u32>(u32(${i}), select(0u, 0xFFFFFFFFu, ${i} < 0));`;if("vec2<u32>"===g.storage&&"u32"===g.value)return`${t}[${r}]=vec2<u32>(u32(${i}), 0u);`;if("u32"===g.storage&&"vec4<bool>"===g.value)return`${t}[${r}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${i}));`;throw Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),z=r=>(()=>{if(g.storage===g.value)return`${t}[${r}]`;if("vec2<u32>"===g.storage&&"i32"===g.value)return`i32(${t}[${r}].x)`;if("vec2<u32>"===g.storage&&"u32"===g.value)return`u32(${t}[${r}].x)`;if("u32"===g.storage&&"vec4<bool>"===g.value)return`vec4<bool>(bool(${t}[${r}] & 0xFFu), bool(${t}[${r}] & 0xFF00u), bool(${t}[${r}] & 0xFF0000u), bool(${t}[${r}] & 0xFF000000u))`;throw Error(`not supported combination of storage type ${g.storage} and value type ${g.value} yet`)})(),A=p<2?"":`
  fn get_${t}ByIndices(indices: ${g.indices}) -> ${m} {
    return ${z(`i2o_${t}(indices)`)};
  }`,O=p<2?"":(n=c.map(t=>`d${t}: u32`).join(", "),o=c.map(t=>`d${t}`).join(", "),`
  fn get_${t}(${n}) -> ${m} {
    return get_${t}ByIndices(${E(o)});
  }`),R=p<2?"":`
  fn set_${t}ByIndices(indices: ${g.indices}, value: ${m}) {
    ${C(`i2o_${t}(indices)`,"value")}
  }`,B=p<2?"":(u=c.map(t=>`d${t}: u32`).join(", "),l=c.map(t=>`d${t}`).join(", "),`
  fn set_${t}(${u}, value: ${m}) {
    set_${t}ByIndices(${E(l)}, value);
  }`);return{impl:()=>{let t=[],r=!1;return _.offsetToIndices&&(t.push(x),r=!0),_.indicesToOffset&&(t.push(T),r=!0),_.broadcastedIndicesToOffset&&(Object.values(I).forEach(r=>t.push(r)),r=!0),_.set&&(t.push(B),r=!0),_.setByIndices&&(t.push(R),r=!0),_.get&&(t.push(O),r=!0),_.getByIndices&&(t.push(A),r=!0),!d&&r&&t.unshift(`const ${$} = ${g.indices}(${i.join(",")});`,`const ${w} = ${g.indices}(${e9.computeStrides(i).join(",")});`),t.join(`
`)},type:g,offsetToIndices:r=>(_.offsetToIndices=!0,p<2?r:`o2i_${t}(${r})`),indicesToOffset:r=>(_.indicesToOffset=!0,p<2?r:`i2o_${t}(${r})`),broadcastedIndicesToOffset:(r,i)=>{_.broadcastedIndicesToOffset=!0;let a=`${i.name}broadcastedIndicesTo${t}Offset`;if(a in I)return`${a}(${r})`;let s=[];for(let t=p-1;t>=0;t--){let r=i.indicesGet("outputIndices",t+i.rank-p);s.push(`${k(w,t)} * (${r} % ${k($,t)})`)}return I[a]=`fn ${a}(outputIndices: ${i.type.indices}) -> u32 {
             return ${s.length>0?s.join("+"):"0u"};
           }`,`${a}(${r})`},indices:E,indicesGet:k,indicesSet:(t,r,i)=>p<2?`${t}=${i};`:`${tW(t,r,p)}=${i};`,set:(...r)=>{if(r.length!==p+1)throw Error(`indices length must be ${p}`);let i=r[p];if("string"!=typeof i)throw Error("value must be string");let a=r.slice(0,p).map(y).join(",");return 0===p?C("0u",i):1===p?C(a[0],i):(_.set=!0,_.setByIndices=!0,_.indicesToOffset=!0,`set_${t}(${a}, ${i})`)},setByOffset:C,setByIndices:(r,i)=>p<2?C(r,i):(_.setByIndices=!0,_.indicesToOffset=!0,`set_${t}ByIndices(${r}, ${i});`),get:(...r)=>{if(r.length!==p)throw Error(`indices length must be ${p}`);let i=r.map(y).join(",");return 0===p?z("0u"):1===p?z(i[0]):(_.get=!0,_.getByIndices=!0,_.indicesToOffset=!0,`get_${t}(${i})`)},getByOffset:z,getByIndices:r=>p<2?z(r):(_.getByIndices=!0,_.indicesToOffset=!0,`get_${t}ByIndices(${r})`),usage:a,name:t,strides:w,shape:$,rank:p}},tj=(t,r,i,a=1)=>tG(t,r,i,"input",a),tH=(t,r,i,a=1)=>tG(t,r,i,"output",a),tK=(t,r,i)=>tG(t,r,i,"atomicOutput",1),tZ=(t,r,i,a=1)=>tG(t,r,i,"internal",a),tQ=class{constructor(t,r){this.normalizedDispatchGroup=t,this.limits=r,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(t){return`if (global_idx >= ${"number"==typeof t?`${t}u`:t}) { return; }`}mainStart(t=tM){let r="number"==typeof t?t:t[0],i="number"==typeof t?1:t[1],a="number"==typeof t?1:t[2];if(r>this.limits.maxComputeWorkgroupSizeX||i>this.limits.maxComputeWorkgroupSizeY||a>this.limits.maxComputeWorkgroupSizeZ)throw Error(`workgroup size [${r}, ${i}, ${a}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(r*i*a>this.limits.maxComputeInvocationsPerWorkgroup)throw Error(`workgroup size [${r}, ${i}, ${a}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let s=1===this.normalizedDispatchGroup[1]&&1===this.normalizedDispatchGroup[2],n=s?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,o=s?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${r*i*a}u + local_idx;`;return`@compute @workgroup_size(${r}, ${i}, ${a})
  fn main(${n}) {
    ${o}
  `}appendVariableUniforms(t){0!==t.rank&&(t.shape.startsWith("uniforms.")&&this.uniforms.push({name:t.shape.replace("uniforms.",""),type:"u32",length:t.rank}),t.strides.startsWith("uniforms.")&&this.uniforms.push({name:t.strides.replace("uniforms.",""),type:"u32",length:t.rank}))}declareVariable(t,r){if("internal"===t.usage)throw Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(t),this.appendVariableUniforms(t);let i="input"===t.usage?"read":"read_write",a="atomicOutput"===t.usage?"atomic<i32>":t.type.storage;return`@group(0) @binding(${r}) var<storage, ${i}> ${t.name}: array<${a}>;`}declareVariables(...t){return t.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(t){if("internal"!==t.usage)throw Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(t),this.appendVariableUniforms(t)}registerInternalVariables(...t){return t.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(t,r,i=1){return this.uniforms.push({name:t,type:r,length:i}),this}registerUniforms(t){return this.uniforms=this.uniforms.concat(t),this}uniformDeclaration(){if(0===this.uniforms.length)return"";let t=[];for(let{name:r,type:i,length:a}of this.uniforms)if(a&&a>4)"f16"===i?t.push(`@align(16) ${r}:array<mat2x4<${i}>, ${Math.ceil(a/8)}>`):t.push(`${r}:array<vec4<${i}>, ${Math.ceil(a/4)}>`);else{let s=null==a||1===a?i:`vec${a}<${i}>`;t.push(`${r}:${s}`)}return`
      struct Uniforms { ${t.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(t=>t.impl()).join(`
`)+this.internalVariables.map(t=>t.impl()).join(`
`)}get variablesInfo(){if(0!==this.uniforms.length)return this.uniforms.map(t=>[[12,10,1,6][["u32","f16","f32","i32"].indexOf(t.type)],t.length??1])}},tX=(t,r)=>new tQ(t,r)}),t3=l(()=>{eY(),ta(),tB(),tY(),tJ=(t,r)=>0!==r.length?r:[...Array(t).keys()].reverse(),t0=(t,r)=>{let i,a,s=t.dataType,n=t.dims.length,o=tJ(n,r),u=(i=t.dims,a=o,e9.sortBasedOnPerm(i,tJ(i.length,a))),l=t.dims,d=u;if(n<2||((t,r)=>{let i=0;for(let a=0;a<t.length;++a)if(1!==r[t[a]]){if(t[a]<i)return!1;i=t[a]}return!0})(o,t.dims))return{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let r=e9.size(u);return{outputs:[{dims:u,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(r/64/4)},programUniforms:[{type:12,data:Math.ceil(r/4)}]}},getShaderSource:t=>{let r=tj("input",s,l,4),i=tH("output",s,d,4);return`
  ${t.registerUniform("output_size","u32").declareVariables(r,i)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`}};let{newShape:p,newPerm:c}=((t,r)=>{let i=[],a=[];for(let s=0;s<t.length;++s)1!==t[s]&&i.push(t[s]),1!==t[r[s]]&&a.push(r[s]);return{newShape:i,newPerm:a}})(t.dims,o),h=e9.areEqual(c,[2,3,1]),f=e9.areEqual(c,[3,1,2]);return 2===p.length||h||f?(d=[(l=h?[p[0],p[1]*p[2]]:f?[p[0]*p[1],p[2]]:p)[1],l[0]],{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let r=e9.size(u);return{outputs:[{dims:u,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(d[1]/16),y:Math.ceil(d[0]/16)},programUniforms:[{type:12,data:r},...tN(l,d)]}},getShaderSource:t=>{let r=tj("a",s,l.length),i=tH("output",s,d.length);return`
  ${t.registerUniform("output_size","u32").declareVariables(r,i)}
  var<workgroup> tile : array<array<${i.type.value}, 17>, 16>;
  ${t.mainStart([16,16,1])}
    let stride = (uniforms.output_shape[1] - 1) / 16 + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * 16u + local_id.x;
    let input_row = workgroup_id_x * 16u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${r.getByIndices(`${r.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * 16u + local_id.x;
    let output_row = workgroup_id_y * 16u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${i.setByIndices(`${i.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`}}):{name:"Transpose",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>{let r=e9.size(u);return{outputs:[{dims:u,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:[{type:12,data:r},...tN(l,d)]}},getShaderSource:t=>{let r=tj("a",s,l.length),i=tH("output",s,d.length);return`
  ${t.registerUniform("output_size","u32").declareVariables(r,i)}

  ${((t,r,i,a)=>{let s=`fn perm(i: ${a.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`;for(let i=0;i<r;++i)s+=`a[${t[i]}]=i[${i}];`;return s+"return a;}"})(o,n,r,i)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${i.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${i.setByOffset("global_idx",r.getByIndices("aIndices"))}
  }`}}},t1=(t,r)=>{((t,r)=>{if(!t||1!==t.length)throw Error("Transpose requires 1 input.");if(0!==r.length&&r.length!==t[0].dims.length)throw Error(`perm size ${r.length} does not match input rank ${t[0].dims.length}`)})(t.inputs,r.perm),t.compute(t0(t.inputs[0],r.perm))},t2=t=>tR({perm:t.perm})}),rl=l(()=>{eY(),ta(),tY(),rE(),t3(),t4={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},t6={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},t8={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},t5={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},t7=(t,r,i,a)=>{var s,n,o,u,l,d,p;let c,h,f,m,g,y,_,b=1===t.inputs.length?i:rh(t.inputs,i),$=b.axes;0!==$.length||b.noopWithEmptyAxes||($=t.inputs[0].dims.map((t,r)=>r));let w=e9.normalizeAxes($,t.inputs[0].dims.length),v=w,x=t.inputs[0],S=((t,r)=>{let i=[];if(!((t,r)=>{for(let i=0;i<t.length;++i)if(t[t.length-i-1]!==r-1-i)return!1;return!0})(t,r)){for(let a=0;a<r;++a)-1===t.indexOf(a)&&i.push(a);t.forEach(t=>i.push(t))}return i})(v,t.inputs[0].dims.length);S.length>0&&(x=t.compute(t0(t.inputs[0],S),{inputs:[0],outputs:[-1]})[0],v=((t,r)=>{let i=[];for(let a=r-t;a<r;++a)i.push(a);return i})(v.length,x.dims.length));let[T,E]=((t,r)=>{let i=[],a=t.length;for(let s=0;s<a;s++)-1===r.indexOf(s)&&i.push(t[s]);return[i,r.map(r=>t[r])]})(x.dims,v),k=T;b.keepDims&&(k=((t,r)=>{let i=t.length+r.length,a=[],s=0;for(let n=0;n<i;n++)-1===r.indexOf(n)?a.push(t[s++]):a.push(1);return a})(T,w)),t.compute((s=r,n=b.cacheKey,o=[x],u=a,l=t.inputs[0].dataType,d=k,p=E,c=o[0].dims,h=e9.size(d),f=e9.size(p),m=tj("_A",o[0].dataType,c),g=tH("output",l,d),y=64,1===h&&(y=256),_=`
          var<workgroup> aBestValues : array<f32, ${y}>;
       `,{name:s,shaderCache:{hint:`${n};${y}`,inputDependencies:["type"]},getShaderSource:t=>`
        ${t.registerUniform("reduceSize","u32").declareVariables(m,g)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${t.mainStart(y)}

          let outputIndex = global_idx / ${y};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${t8[u]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${y}) {
           let candidate = f32(${m.getByOffset("offset + k")});
           bestValue = ${t4[u]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${y}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${t6[u]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${g.setByOffset("outputIndex",`${"mean"===u?`${g.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${g.type.storage}(${t5[u]})`}`)};
         }
        }`,getRunData:()=>({outputs:[{dims:d,dataType:l}],dispatchGroup:{x:h},programUniforms:[{type:12,data:f}]})}),{inputs:[x]})},t9=(t,r)=>{t7(t,"ReduceMeanShared",r,"mean")},re=(t,r)=>{t7(t,"ReduceL1Shared",r,"l1")},rt=(t,r)=>{t7(t,"ReduceL2Shared",r,"l2")},rr=(t,r)=>{t7(t,"ReduceLogSumExpShared",r,"logSumExp")},ri=(t,r)=>{t7(t,"ReduceMaxShared",r,"max")},ra=(t,r)=>{t7(t,"ReduceMinShared",r,"min")},rs=(t,r)=>{t7(t,"ReduceProdShared",r,"prod")},rn=(t,r)=>{t7(t,"ReduceSumShared",r,"sum")},ro=(t,r)=>{t7(t,"ReduceSumSquareShared",r,"sumSquare")},ru=(t,r)=>{t7(t,"ReduceLogSumShared",r,"logSum")}}),rE=l(()=>{eY(),ta(),tB(),tY(),rl(),rd=t=>{if(!t||0===t.length||t.length>2)throw Error("Reduce op requires 1 or 2 inputs.");if(2===t.length&&1!==t[1].dims.length)throw Error("Invalid axes input dims.")},rp=t=>["","",`var value = ${t.getByIndices("input_indices")};`,""],rc=(t,r,i,a,s,n,o=!1,u=!1)=>{let l=[],d=i[0].dims,p=d.length,c=e9.normalizeAxes(s,p),h=!u&&0===c.length;d.forEach((t,r)=>{h||c.indexOf(r)>=0?o&&l.push(1):l.push(t)});let f=l.length,m=e9.size(l);return{name:t,shaderCache:r,getShaderSource:t=>{let r=[],s=tj("_A",i[0].dataType,p),u=tH("output",n,f),l=a(s,u,c),m=l[2];for(let t=0,i=0;t<p;t++)h||c.indexOf(t)>=0?(o&&i++,m=`for(var j${t}: u32 = 0; j${t} < ${d[t]}; j${t}++) {
                  ${l[2].includes("last_index")?`let last_index = j${t};`:""}
                  ${s.indicesSet("input_indices",t,`j${t}`)}
                  ${m}
                }`):(r.push(`${s.indicesSet("input_indices",t,u.indicesGet("output_indices",i))};`),i++);return`

        ${t.registerUniform("output_size","u32").declareVariables(s,u)}

        ${t.mainStart()}
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${s.type.indices};
          let output_indices = ${u.offsetToIndices("global_idx")};

          ${r.join(`
`)}
          ${l[0]}       // init ops for reduce max/min
          ${l[1]}
          ${m}
          ${l[3]}
          ${4===l.length?u.setByOffset("global_idx","value"):l.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:n}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},...tN(d,l)]})}},rh=(t,r)=>{let i=[];return t[1].dims[0]>0&&t[1].getBigInt64Array().forEach(t=>i.push(Number(t))),tR({axes:i,keepDims:r.keepDims,noopWithEmptyAxes:r.noopWithEmptyAxes})},rf=(t,r,i,a)=>{let s=t.inputs,n=1===s.length?i:rh(s,i);t.compute(rc(r,{hint:n.cacheKey,inputDependencies:["rank"]},[s[0]],n.noopWithEmptyAxes&&0===n.axes.length?rp:a,n.axes,s[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},rm=(t,r,i)=>{if(0===r.length)return i;let a=1,s=1;for(let i=0;i<r.length;i++)-1===r.indexOf(i)?a*=t[i]:s*=t[i];return s<32&&a>1024},rg=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceMean",a,(t,r,a)=>{let s=1;for(let r=0;r<t.rank;r++)(a.indexOf(r)>=0||0===a.length)&&(s*=i.inputs[0].dims[r]);return["var sum = f32(0);","",`sum += f32(${t.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${s});`]})):t9(t,r)},ry=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceL1",a,(t,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${t.getByIndices("input_indices")});`,""])):re(t,r)},r_=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceL2",a,(t,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])):rt(t,r)},rb=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceLogSumExp",a,(t,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${t.getByIndices("input_indices")});`,"value = log(value);"])):rr(t,r)},r$=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceMax",a,(t,r,i)=>{let a=[];for(let r=0;r<t.rank;r++)(i.indexOf(r)>=0||0===i.length)&&a.push(t.indicesSet("input_indices",r,0));return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = max(value, ${t.getByIndices("input_indices")});`,""]})):ri(t,r)},rw=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceMin",a,(t,r,i)=>{let a=[];for(let r=0;r<t.rank;r++)(i.indexOf(r)>=0||0===i.length)&&a.push(`input_indices[${r}] = 0;`);return[`${a.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};`,`value = min(value, ${t.getByIndices("input_indices")});`,""]})):ra(t,r)},rv=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceProd",a,(t,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${t.getByIndices("input_indices")};`,""])):rs(t,r)},rx=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceSum",a,(t,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,""])):rn(t,r)},rS=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceSumSquare",a,(t,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${t.getByIndices("input_indices")}; value += t * t;`,""])):ro(t,r)},rT=(t,r)=>{var i,a;rm(t.inputs[0].dims,r.axes,r.noopWithEmptyAxes)?(i=t,a=r,rd(i.inputs),rf(i,"ReduceLogSum",a,(t,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${t.getByIndices("input_indices")};`,"value = log(value);"])):ru(t,r)}}),rA=l(()=>{eY(),tB(),rE(),rk=t=>{if(!t||0===t.length||t.length>2)throw Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(1!==t[0].dataType)throw Error("Invalid input type.")},rI=(t,r)=>{rk(t.inputs),t.compute(rc("ArgMin",{hint:r.cacheKey,inputDependencies:["rank"]},[t.inputs[0]],(t,i,a)=>{let s=[];for(let r=0;r<t.rank;r++)(a.indexOf(r)>=0||0===a.length)&&s.push(`input_indices[${r}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${r.selectLastIndex>0?"<=":"<"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]},[r.axis],7,r.keepDims),{inputs:[0]})},rC=(t,r)=>{rk(t.inputs),t.compute(rc("argMax",{hint:r.cacheKey,inputDependencies:["rank"]},[t.inputs[0]],(t,i,a)=>{let s=[];for(let r=0;r<t.rank;r++)(a.indexOf(r)>=0||0===a.length)&&s.push(`input_indices[${r}] = 0;`);return[`${s.join(`
`)}`,`var value = ${t.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${t.getByIndices("input_indices")} ${r.selectLastIndex>0?">=":">"} value) {
         value = ${t.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",i.setByOffset("global_idx","best_index")]},[r.axis],7,r.keepDims),{inputs:[0]})},rz=t=>tR(t)}),rM=l(()=>{eY(),ta(),tv(),tY(),rO=(t,r,i)=>r&&t?`
      let total_sequence_length_input = u32(${r.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${t?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${i?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,rR=(t,r,i,a,s,n,o,u,l,d,p,c)=>{var h,f,m,g,y,_,b,$,w,v,x,S,T,E,k,I,C,z,A,O,R,B,M,D,P;let U,N,L,V,q,F,W,G,j,H,K,Z,Q,X,Y,J,ee,et,er,ei,ea,es,en,eo,eu,el,ed,ep,ec,eh,ef,em,eg,ey=Math.min(t.outputCount,1+ +!!o+ +!!u),e_=ey>1?o:void 0,eb=ey>1?u:void 0,e$=ey>1?d.pastSequenceLength:0,ew=e$+d.kvSequenceLength,ev=l&&e9.size(l.dims)>0?l:void 0,ex=[r,i];e_&&e9.size(e_.dims)>0&&ex.push(e_),ev&&ex.push(ev),p&&ex.push(p),c&&ex.push(c);let eS=t.compute((h=ey,f=r,m=i,g=e_,y=ev,_=d,b=e$,$=p,w=c,U=b+_.kvSequenceLength,N=[_.batchSize,_.numHeads,_.sequenceLength,U],L=h>1&&g,V=_.kvNumHeads?_.kvNumHeads:_.numHeads,q=L?[_.batchSize,V,U,_.headSize]:void 0,F=_.nReps?_.nReps:1,W=0===_.scale?1/Math.sqrt(_.headSize):_.scale,G=tL(_.headSize),j=_.headSize/G,H={x:Math.ceil(U/12),y:Math.ceil(_.sequenceLength/12),z:_.batchSize*_.numHeads},K=[{type:12,data:_.sequenceLength},{type:12,data:j},{type:12,data:U},{type:12,data:_.numHeads},{type:12,data:_.headSize},{type:1,data:W},{type:12,data:b},{type:12,data:_.kvSequenceLength},{type:12,data:F}],Z=L&&g&&e9.size(g.dims)>0,Q=["type","type"],Z&&Q.push("type"),y&&Q.push("type"),$&&Q.push("type"),w&&Q.push("type"),X=[{dims:N,dataType:f.dataType,gpuDataType:0}],L&&X.push({dims:q,dataType:f.dataType,gpuDataType:0}),{name:"AttentionProbs",shaderCache:{hint:`${G};${void 0!==y};${void 0!==g};${h}`,inputDependencies:Q},getRunData:()=>({outputs:X,dispatchGroup:H,programUniforms:K}),getShaderSource:t=>{let r=tj("q",f.dataType,f.dims,G),i=[r,tj("key",m.dataType,m.dims,G)];if(Z){let t=tj("past_key",g.dataType,g.dims,G);i.push(t)}y&&i.push(tj("attention_bias",y.dataType,y.dims));let a=$?tj("seq_lens",$.dataType,$.dims):void 0;a&&i.push(a);let s=w?tj("total_sequence_length_input",w.dataType,w.dims):void 0;s&&i.push(s);let n=tH("output",f.dataType,N),o=[n];L&&o.push(tH("present_key",f.dataType,q,G));let u=tU(1,G);return`
  const TILE_SIZE = 12u;

  var<workgroup> tileQ: array<${r.type.storage}, 144>;
  var<workgroup> tileK: array<${r.type.storage}, 144>;
  ${t.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...i,...o)}
  ${t.mainStart([12,12,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${1===F?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${1===F?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${rO(a,s,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${Z&&L?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${L?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${u}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${Z&&L?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${L?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${u}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(G){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw Error(`Unsupported components: ${G}`)}})()};
        output[outputIdx] = ${n.type.value} (sum * uniforms.alpha) + ${y?"attention_bias[outputIdx]":"0.0"};
    }
  }`}}),{inputs:ex,outputs:ey>1?[-1,1]:[-1]})[0];t.compute((v=eS,x=d.batchSize,S=d.numHeads,T=e$,E=d.sequenceLength,k=ew,I=p,C=c,Y=tL(I?1:k),J=64,(ee=k/Y)<64&&(J=32),et=[{type:12,data:x},{type:12,data:S},{type:12,data:T},{type:12,data:E},{type:12,data:ee},{type:12,data:Math.ceil(k/Y/J)}],er=tP(v.dataType,Y),ei=tU(1,Y),ea=["type"],I&&ea.push("type"),C&&ea.push("type"),{name:"AttentionProbsSoftmax",shaderCache:{hint:`${J};${er};${Y}`,inputDependencies:ea},getShaderSource:t=>{let r=tH("x",v.dataType,v.dims,Y),i=[r],a=I?tj("seq_lens",I.dataType,I.dims):void 0;a&&i.push(a);let s=C?tj("total_sequence_length_input",C.dataType,C.dims):void 0;s&&i.push(s);let n=tU(v.dataType);return`
  var<workgroup> thread_max: array<f32, ${J}>;
  var<workgroup> thread_sum: array<f32, ${J}>;
  ${t.registerUniforms([{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}]).declareVariables(...i)}
  ${t.mainStart([J,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${rO(a,s,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${J}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${I?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${ei}(-3.4028234663852886e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${ei}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(Y){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw Error(`Unsupported components: ${Y}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.4028234663852886e+38f);
    for (var i = 0u; i < ${J}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${ei}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${ei}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(Y){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw Error(`Unsupported components: ${Y}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${J}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${r.type.value}(${n}(1.0) / ${n}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${ei}(x[offset + i]);
        x[offset + i] = ${r.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${I?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${r.type.value}(${n}(0));
        }`:""};
  }`},getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:E,z:x*S},programUniforms:et})}),{inputs:p&&c?[eS,p,c]:[eS],outputs:[]});let eT=[eS,a];eb&&e9.size(eb.dims)>0&&eT.push(eb),p&&eT.push(p),c&&eT.push(c),t.compute((z=ey,A=eS,O=a,R=eb,B=d,M=e$,D=p,P=c,es=M+B.kvSequenceLength,en=B.nReps?B.nReps:1,eo=B.vHiddenSize*en,eu=z>1&&R,el=B.kvNumHeads?B.kvNumHeads:B.numHeads,ed=eu?[B.batchSize,el,es,B.headSize]:void 0,ep=[B.batchSize,B.sequenceLength,eo],ec={x:Math.ceil(B.vHeadSize/12),y:Math.ceil(B.sequenceLength/12),z:B.batchSize*B.numHeads},eh=[{type:12,data:B.sequenceLength},{type:12,data:es},{type:12,data:B.vHeadSize},{type:12,data:B.numHeads},{type:12,data:B.headSize},{type:12,data:eo},{type:12,data:M},{type:12,data:B.kvSequenceLength},{type:12,data:en}],ef=eu&&R&&e9.size(R.dims)>0,em=["type","type"],ef&&em.push("type"),D&&em.push("type"),P&&em.push("type"),eg=[{dims:ep,dataType:A.dataType,gpuDataType:0}],eu&&eg.push({dims:ed,dataType:A.dataType,gpuDataType:0}),{name:"AttentionScore",shaderCache:{hint:`${void 0!==R};${z}`,inputDependencies:em},getRunData:()=>({outputs:eg,dispatchGroup:ec,programUniforms:eh}),getShaderSource:t=>{let r=tj("probs",A.dataType,A.dims),i=[r,tj("v",O.dataType,O.dims)];ef&&i.push(tj("past_value",R.dataType,R.dims));let a=D?tj("seq_lens",D.dataType,D.dims):void 0;D&&i.push(a);let s=P?tj("total_sequence_length_input",P.dataType,P.dims):void 0;P&&i.push(s);let n=[tH("output",A.dataType,ep)];return eu&&n.push(tH("present_value",A.dataType,ed)),`
  const TILE_SIZE = 12u;
  var<workgroup> tileQ: array<${r.type.value}, 144>;
  var<workgroup> tileV: array<${r.type.value}, 144>;
  ${t.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}]).declareVariables(...i,...n)}
  ${t.mainStart([12,12,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${1===en?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${1===en?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${rO(a,s,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${ef&&eu?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${eu?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${r.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${ef&&eu?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${eu?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`}}),{inputs:eT,outputs:ey>1?[0,2]:[0]})},rB=(t,r)=>{var i,a;let s,n,o,u,l,d,p,c=((t,r)=>{let i=t[0],a=t[1],s=t[2],n=t[3],o=t[4],u=t[5];if(o&&u)throw Error("Attention cannot have both past and attention_bias");if(3!==i.dims.length)throw Error('Input "input" must have 3 dimensions');let l=i.dims[0],d=i.dims[1],p=i.dims[2];if(1!==s.dims.length)throw Error('Input "bias" is expected to have 1 dimensions');if(2!==a.dims.length)throw Error('Input "weights" is expected to have 2 dimensions');if(a.dims[0]!==p)throw Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(s.dims[0]!==a.dims[1])throw Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let c=s.dims[0]/3,h=c,f=h;if(r.qkvHiddenSizes.length>0){if(3!==r.qkvHiddenSizes.length)throw Error("qkv_hidden_sizes attribute should have 3 elements");for(let t of r.qkvHiddenSizes)if(t%r.numHeads!=0)throw Error("qkv_hidden_sizes should be divisible by num_heads");c=r.qkvHiddenSizes[0],h=r.qkvHiddenSizes[1],f=r.qkvHiddenSizes[2]}if(c!==h)throw Error("qkv_hidden_sizes first element should be same as the second");if(s.dims[0]!==c+h+f)throw Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let m=0;if(o){if(h!==f)throw Error('Input "past" expect k_hidden_size == v_hidden_size');if(5!==o.dims.length)throw Error('Input "past" must have 5 dimensions');if(2!==o.dims[0])throw Error('Input "past" first dimension must be 2');if(o.dims[1]!==l)throw Error('Input "past" second dimension must be batch_size');if(o.dims[2]!==r.numHeads)throw Error('Input "past" third dimension must be num_heads');if(o.dims[4]!==h/r.numHeads)throw Error('Input "past" fifth dimension must be k_hidden_size / num_heads');r.pastPresentShareBuffer||(m=o.dims[3])}let g=d+m;if(n)throw Error("Mask not supported");if(o)throw Error("past is not supported");if(u){if(4!==u.dims.length)throw Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==r.numHeads||u.dims[2]!==d||u.dims[3]!==g)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:d,totalSequenceLength:g,maxSequenceLength:-1,inputHiddenSize:p,hiddenSize:c,vHiddenSize:f,headSize:Math.floor(c/r.numHeads),vHeadSize:Math.floor(f/r.numHeads),numHeads:r.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:r.maskFilterValue,maskType:0,scale:r.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}})(t.inputs,r),[h,f,m]=(i=t,s=[(a=c).batchSize,a.numHeads,a.sequenceLength,a.headSize],n=a.sequenceLength,o=a.inputHiddenSize,u=a.headSize,l={x:Math.ceil(a.headSize/12),y:Math.ceil(a.sequenceLength/12),z:a.batchSize*a.numHeads},d=[i.inputs[0],i.inputs[1],i.inputs[2]],p=[{type:12,data:n},{type:12,data:o},{type:12,data:u},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:a.hiddenSize},{type:12,data:a.hiddenSize+a.hiddenSize+a.vHiddenSize}],i.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:s,dataType:i.inputs[0].dataType,gpuDataType:0},{dims:s,dataType:i.inputs[0].dataType,gpuDataType:0},{dims:s,dataType:i.inputs[0].dataType,gpuDataType:0}],dispatchGroup:l,programUniforms:p}),getShaderSource:t=>{let r=tH("output_q",d[0].dataType,s),i=tH("output_k",d[0].dataType,s),a=tH("output_v",d[0].dataType,s),n=tj("input",d[0].dataType,d[0].dims),o=tj("weight",d[1].dataType,d[1].dims),u=tj("bias",d[2].dataType,d[2].dims),l=n.type.storage;return`
  const TILE_SIZE = 12u;
  var<workgroup> tileInput: array<${l}, 144>;
  var<workgroup> tileWeightQ: array<${l}, 144>;
  var<workgroup> tileWeightK: array<${l}, 144>;
  var<workgroup> tileWeightV: array<${l}, 144>;
  ${t.registerUniforms([{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}]).declareVariables(n,o,u,r,i,a)}
  ${t.mainStart([12,12,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${l}(0);
    var valueK = ${l}(0);
    var valueV = ${l}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`}},{inputs:d,outputs:[-1,-1,-1]}));return rR(t,h,f,m,t.inputs[4],void 0,void 0,void 0,t.inputs[5],c)}}),rP=l(()=>{ed(),eY(),ta(),tB(),tY(),rD=(t,r)=>{let i,{inputs:a,outputCount:s}=t,n=(i={...r,outputCount:s},tR(i));if(S.webgpu.validateInputContent&&((t,r)=>{if(!t||5!==t.length)throw Error("BatchNormalization requires 5 inputs");let i=(t,r,i)=>{let a=r.length;if(a!==t.length)throw Error(`${i}: num dimensions != ${a}`);r.forEach((r,a)=>{if(r!==t[a])throw Error(`${i}: dim[${a}] do not match`)})};if(t[0].dims.length>1){let a="NHWC"===r.format?r.spatial?t[0].dims.slice(-1):t[0].dims.slice(-1).concat(t[0].dims.slice(1,t[0].dims.length-1)):t[0].dims.slice(1,r.spatial?2:void 0);i(t[1].dims,a,"Invalid input scale"),i(t[2].dims,a,"Invalid input B"),i(t[3].dims,a,"Invalid input mean"),i(t[4].dims,a,"Invalid input var")}else i(t[1].dims,[1],"Invalid input scale"),i(t[2].dims,[1],"Invalid input B"),i(t[3].dims,[1],"Invalid input mean"),i(t[4].dims,[1],"Invalid input var")})(a,n),r.trainingMode)throw Error("BatchNormalization trainingMode is not supported yet.");t.compute(((t,r)=>{let{epsilon:i,spatial:a,format:s}=r,n=t[0].dims,o=a?tL(n[n.length-1]):1,u="NHWC"===s&&n.length>1?o:1,l=e9.size(n)/o,d=a?n.length:n,p=tj("x",t[0].dataType,t[0].dims,o),c=tj("scale",t[1].dataType,t[1].dims,u),h=tj("bias",t[2].dataType,t[2].dims,u),f=tj("inputMean",t[3].dataType,t[3].dims,u),m=tj("inputVar",t[4].dataType,t[4].dims,u),g=tH("y",t[0].dataType,d,o);return{name:"BatchNormalization",shaderCache:{hint:`${r.epsilon}_${r.format}_${a}_${o}`,inputDependencies:a?["rank","type","type","type","type"]:void 0},getShaderSource:t=>`
  const epsilon = ${i};
  ${t.registerUniform("outputSize","u32").declareVariables(p,c,h,f,m,g)}
  ${t.mainStart()}
  ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${g.offsetToIndices(`global_idx * ${o}`)};
    ${(()=>{let t="";if(a)t=`let cOffset = ${1===n.length?"0u":"NHWC"===s?`outputIndices[${n.length-1}] / ${o}`:"outputIndices[1]"};`;else if("NCHW"===s)t=`
            ${g.indicesSet("outputIndices","0","0")}
            let cOffset = ${g.indicesToOffset("outputIndices")};`;else{t=`var cIndices = ${c.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let r=1;r<c.rank;r++)t+=`cIndices[${r}] = outputIndices[${r}];`;t+=`let cOffset = ${c.indicesToOffset("cIndices")};`}return t})()}
    let scale = ${c.getByOffset("cOffset")};
    let bias = ${h.getByOffset("cOffset")};
    let inputMean = ${f.getByOffset("cOffset")};
    let inputVar = ${m.getByOffset("cOffset")};
    let x = ${p.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${g.setByOffset("global_idx","value")}
  }`,getRunData:()=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:a?[{type:12,data:l},...tN(n)]:[{type:12,data:l}]})}})(a,n))}}),rN=l(()=>{ta(),tY(),rU=t=>{var r;let i,a,s,n,o,u,l,d;(t=>{if(3!==t[0].dims.length)throw Error("input should have 3 dimensions");if(![320,640,1280].includes(t[0].dims[2]))throw Error("number of channels should be 320, 640 or 1280");if(1!==t[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(t[0].dims[2]!==t[1].dims[0])throw Error("last dimension of input and bias are not the same")})(t.inputs),t.compute((i=(r=t.inputs)[0].dims,a=r[0].dims[2],s=e9.size(i)/4,n=r[0].dataType,o=tj("input",n,i,4),u=tj("bias",n,[a],4),l=tj("residual",n,i,4),d=tH("output",n,i,4),{name:"BiasAdd",getRunData:()=>({outputs:[{dims:i,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)}}),getShaderSource:t=>`
  const channels = ${a}u / 4;
  ${t.declareVariables(o,u,l,d)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(s)}
    let value = ${o.getByOffset("global_idx")}
      + ${u.getByOffset("global_idx % channels")} + ${l.getByOffset("global_idx")};
    ${d.setByOffset("global_idx","value")}
  }`}))}}),i$=l(()=>{eY(),ta(),tB(),tY(),rL=(t,r,i,a,s,n=t.dataType,o,u)=>{let l=[{type:12,data:Math.ceil(e9.size(t.dims)/4)}];return o&&l.push(...o),{name:r,shaderCache:{hint:s,inputDependencies:["type"]},getShaderSource:r=>{var s,o,l,d,p,c,h;let f,m,g,y,_;return s=r,o=e9.size(t.dims),l=t.dataType,d=n,p=i,c=a,h=u,f=Math.ceil(o/4),m="",m="string"==typeof p?`${p}(a)`:p("a"),g=tj("inputData",l,[f],4),y=tH("outputData",d,[f],4),_=[{name:"vec_size",type:"u32"}],h&&_.push(...h),`
      ${s.registerUniforms(_).declareVariables(g,y)}

  ${c??""}

  ${s.mainStart()}
    ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${g.getByOffset("global_idx")};
    ${y.setByOffset("global_idx",m)}
  }`},getRunData:r=>({outputs:[{dims:t.dims,dataType:n}],dispatchGroup:{x:Math.ceil(e9.size(r[0].dims)/64/4)},programUniforms:l})}},rV=t=>{t.compute(rL(t.inputs[0],"Abs","abs"))},rq=t=>{t.compute(rL(t.inputs[0],"Acos","acos"))},rF=t=>{t.compute(rL(t.inputs[0],"Acosh","acosh"))},rW=t=>{t.compute(rL(t.inputs[0],"Asin","asin"))},rG=t=>{t.compute(rL(t.inputs[0],"Asinh","asinh"))},rj=t=>{t.compute(rL(t.inputs[0],"Atan","atan"))},rH=t=>{t.compute(rL(t.inputs[0],"Atanh","atanh"))},rK=t=>tR(t),rZ=(t,r)=>{let i;switch(r.to){case 10:i="vec4<f16>";break;case 1:i="vec4<f32>";break;case 12:i="vec4<u32>";break;case 6:i="vec4<i32>";break;case 9:i="vec4<bool>";break;default:throw RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${r.to}`)}t.compute(rL(t.inputs[0],"Cast",i,void 0,r.cacheKey,r.to))},rQ=(t,r)=>{let i=r||(t=>{let r,i,a=t.length>=2&&0!==t[1].data,s=t.length>=3&&0!==t[2].data;switch(t[0].dataType){case 1:r=a?t[1].getFloat32Array()[0]:-34028234663852886e22,i=s?t[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:r=a?t[1].getUint16Array()[0]:64511,i=s?t[2].getUint16Array()[0]:31743;break;default:throw Error("Unsupport data type")}return tR({min:r,max:i})})(t.inputs),a=tU(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"Clip",t=>`clamp(${t}, vec4<${a}>(uniforms.min), vec4<${a}>(uniforms.max))`,void 0,i.cacheKey,void 0,[{type:t.inputs[0].dataType,data:i.min},{type:t.inputs[0].dataType,data:i.max}],[{name:"min",type:a},{name:"max",type:a}]),{inputs:[0]})},rX=t=>{t.compute(rL(t.inputs[0],"Ceil","ceil"))},rY=t=>{t.compute(rL(t.inputs[0],"Cos","cos"))},rJ=t=>{t.compute(rL(t.inputs[0],"Cosh","cosh"))},r0=t=>tR(t),r1=(t,r)=>{let i=tU(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"Elu",t=>`elu_vf32(${t})`,`
  const elu_alpha_ = ${i}(${r.alpha});

  fn elu_f32(a: ${i}) -> ${i} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${i}>) -> vec4<${i}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,r.cacheKey))},r2=(t="f32")=>`
const r0: ${t} = 0.3275911;
const r1: ${t} = 0.254829592;
const r2: ${t} = -0.284496736;
const r3: ${t} = 1.421413741;
const r4: ${t} = -1.453152027;
const r5: ${t} = 1.061405429;

fn erf_vf32(v: vec4<${t}>) -> vec4<${t}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,r3=t=>{let r=tU(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"Erf",t=>`erf_vf32(${t})`,r2(r)))},r4=t=>{t.compute(rL(t.inputs[0],"Exp","exp"))},r6=t=>{t.compute(rL(t.inputs[0],"Floor","floor"))},r8=t=>{let r=tU(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"Gelu",t=>`0.5 * ${t} * (1.0 + erf_vf32(${t} * 0.7071067811865475))`,r2(r)))},r5=(t,r)=>{let i=tU(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"LeakyRelu",t=>`select(leaky_relu_alpha_ * ${t}, ${t}, ${t} >= vec4<${i}>(0.0))`,`const leaky_relu_alpha_ = ${i}(${r.alpha});`,r.cacheKey))},r7=t=>{t.compute(rL(t.inputs[0],"Not",t=>`!${t}`))},r9=t=>{t.compute(rL(t.inputs[0],"Neg",t=>`-${t}`))},ie=t=>{t.compute(rL(t.inputs[0],"Reciprocal",t=>`1.0/${t}`))},it=t=>{let r=tU(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"Relu",t=>`select(vec4<${r}>(0.0), ${t}, ${t} > vec4<${r}>(0.0))`))},ir=t=>{t.compute(rL(t.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},ii=t=>tR(t),ia=(t,r)=>{let i=tU(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"HardSigmoid",t=>`max(vec4<${i}>(0.0), min(vec4<${i}>(1.0), ${r.alpha} * ${t} + vec4<${i}>(${r.beta})))`,void 0,r.cacheKey))},is=t=>{t.compute(rL(t.inputs[0],"Sin","sin"))},io=t=>{t.compute(rL(t.inputs[0],"Sinh","sinh"))},iu=t=>{t.compute(rL(t.inputs[0],"Sqrt","sqrt"))},il=t=>{t.compute(rL(t.inputs[0],"Tan","tan"))},id=t=>`sign(${t}) * (1 - exp(-2 * abs(${t}))) / (1 + exp(-2 * abs(${t})))`,ip=t=>{t.compute(rL(t.inputs[0],"Tanh",id))},ic=(t="f32")=>`
const fast_gelu_a: ${t} = 0.5;
const fast_gelu_b: ${t} = 0.7978845608028654;
const fast_gelu_c: ${t} = 0.035677408136300125;

fn tanh_v(v: vec4<${t}>) -> vec4<${t}> {
  return ${id("v")};
}
`,ih=t=>`(fast_gelu_a + fast_gelu_a * tanh_v(${t} * (fast_gelu_c * ${t} * ${t} + fast_gelu_b))) * ${t}`,im=t=>{let r=tU(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"FastGelu",ih,ic(r),void 0,t.inputs[0].dataType))},ig=(t,r)=>{let i=tU(t.inputs[0].dataType);return t.compute(rL(t.inputs[0],"ThresholdedRelu",t=>`select(vec4<${i}>(0.0), ${t}, ${t} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${i}>(${r.alpha});`,r.cacheKey)),0},iy=t=>{t.compute(rL(t.inputs[0],"Log","log"))},i_=t=>`quick_gelu_impl(${t})`,ib=(t,r)=>{let i,a,s=tU(t.inputs[0].dataType);t.compute(rL(t.inputs[0],"QuickGelu",i_,(i=s,a=r.alpha,`
const alpha = vec4<${i}>(${a});
const one = ${i}(1.0);
const zero = ${i}(0.0);

fn quick_gelu_impl(x: vec4<${i}>) -> vec4<${i}> {
  let v = x *alpha;
  var x1 : vec4<${i}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`),r.cacheKey,t.inputs[0].dataType))}}),iv=l(()=>{ta(),tY(),i$(),iw=t=>{var r;let i,a,s,n,o,u;(t=>{if(3!==t[0].dims.length)throw Error("input should have 3 dimensions");if(![2560,5120,10240].includes(t[0].dims[2]))throw Error("hidden state should be 2560, 5120 or 10240");if(1!==t[1].dims.length)throw Error("bias is expected to have 1 dimensions");if(t[0].dims[2]!==t[1].dims[0])throw Error("last dimension of input and bias are not the same")})(t.inputs),t.compute(((i=(r=t.inputs)[0].dims.slice())[2]=i[2]/2,a=tj("input",r[0].dataType,r[0].dims,4),s=tj("bias",r[0].dataType,[r[0].dims[2]],4),n=tH("output",r[0].dataType,i,4),o=e9.size(i)/4,u=tP(r[0].dataType),{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:i,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)}}),getShaderSource:t=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${r[0].dims[2]/4/2}u;

  ${t.declareVariables(a,s,n)}

  ${r2(u)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes(o)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${n.setByOffset("global_idx","valueLeft * geluRight")}
  }`}))}}),iB=l(()=>{eY(),ta(),tY(),ix=(t,r,i,a,s,n)=>{t.compute(((t,r,i,a,s,n,o=i.dataType)=>{let u=i.dims.map(Number),l=a.dims.map(Number),d=!e9.areEqual(u,l),p=u,c=e9.size(u),h=!1,f=!1,m=[d];if(d){let t=e7.calcShape(u,l,!1);if(!t)throw Error("Can't perform binary op on the given tensors");p=t.slice(),c=e9.size(p);let r=1===e9.size(u),i=1===e9.size(l),a=u.length>0&&u[u.length-1]%4==0,s=l.length>0&&l[l.length-1]%4==0;m.push(r),m.push(i),m.push(a),m.push(s);let n=1;for(let t=1;t<p.length;t++){let r=u[u.length-t];if(r===l[l.length-t])n*=r;else break}n%4==0?(f=!0,h=!0):(r||i||a||s)&&(h=!0)}else h=!0;return m.push(h),{name:t,shaderCache:{hint:r+m.map(t=>t.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:t=>((t,r,i,a,s,n,o,u,l,d,p,c)=>{let h,f;"string"==typeof u?h=f=(t,r)=>`${u}((${t}),(${r}))`:"function"==typeof u?h=f=u:(h=u.scalar,f=u.vector);let m=tH("outputData",p,a.length,4),g=tj("aData",l,r.length,4),y=tj("bData",d,i.length,4),_;if(s)if(n){let t=1===e9.size(r),a=1===e9.size(i),s=r.length>0&&r[r.length-1]%4==0,n=i.length>0&&i[i.length-1]%4==0;_=t||a?m.setByOffset("global_idx",f(t?`${g.type.value}(${g.getByOffset("0")}.x)`:g.getByOffset("global_idx"),a?`${y.type.value}(${y.getByOffset("0")}.x)`:y.getByOffset("global_idx"))):`
            let outputIndices = ${m.offsetToIndices("global_idx * 4u")};
            let offsetA = ${g.broadcastedIndicesToOffset("outputIndices",m)};
            let offsetB = ${y.broadcastedIndicesToOffset("outputIndices",m)};
            ${m.setByOffset("global_idx",f(o||s?g.getByOffset("offsetA / 4u"):`${g.type.value}(${g.getByOffset("offsetA / 4u")}[offsetA % 4u])`,o||n?y.getByOffset("offsetB / 4u"):`${y.type.value}(${y.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else _=m.setByOffset("global_idx",f(g.getByOffset("global_idx"),y.getByOffset("global_idx")));else{if(!n)throw Error("no necessary to use scalar implementation for element-wise binary op implementation.");let t=(t,r,i="")=>{let a=`aData[indexA${r}][componentA${r}]`,s=`bData[indexB${r}][componentB${r}]`;return`
            let outputIndices${r} = ${m.offsetToIndices(`global_idx * 4u + ${r}u`)};
            let offsetA${r} = ${g.broadcastedIndicesToOffset(`outputIndices${r}`,m)};
            let offsetB${r} = ${y.broadcastedIndicesToOffset(`outputIndices${r}`,m)};
            let indexA${r} = offsetA${r} / 4u;
            let indexB${r} = offsetB${r} / 4u;
            let componentA${r} = offsetA${r} % 4u;
            let componentB${r} = offsetB${r} % 4u;
            ${t}[${r}] = ${i}(${h(a,s)});
          `};_=9===p?`
            var data = vec4<u32>(0);
            ${t("data",0,"u32")}
            ${t("data",1,"u32")}
            ${t("data",2,"u32")}
            ${t("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${t("outputData[global_idx]",0)}
            ${t("outputData[global_idx]",1)}
            ${t("outputData[global_idx]",2)}
            ${t("outputData[global_idx]",3)}
          `}return`
        ${t.registerUniform("vec_size","u32").declareVariables(g,y,m)}

        ${c??""}

        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${_}
      }`})(t,u,l,p,h,d,f,s,i.dataType,a.dataType,o,n),getRunData:()=>({outputs:[{dims:p,dataType:o}],dispatchGroup:{x:Math.ceil(c/64/4)},programUniforms:[{type:12,data:Math.ceil(e9.size(p)/4)},...tN(u,l,p)]})}})(r,s??"",t.inputs[0],t.inputs[1],i,a,n))},iS=t=>{ix(t,"Add",(t,r)=>`${t}+${r}`)},iT=t=>{ix(t,"Div",(t,r)=>`${t}/${r}`)},iE=t=>{ix(t,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},ik=t=>{ix(t,"Mul",(t,r)=>`${t}*${r}`)},iI=t=>{let r=tj("input",t.inputs[0].dataType,t.inputs[0].dims).type.value;ix(t,"Pow",{scalar:(t,r)=>`pow_custom(${t},${r})`,vector:(t,r)=>`pow_vector_custom(${t},${r})`},`
    fn pow_custom(a : ${r}, b : ${r}) -> ${r} {
      if (b == ${r}(0.0)) {
        return ${r}(1.0);
      } else if (a < ${r}(0.0) && f32(b) != floor(f32(b))) {
        return ${r}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${r}(1.0), round(f32(abs(b) % ${r}(2.0))) != 1.0) * ${r}(${"i32"===r?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${r}>, b : vec4<${r}>) -> vec4<${r}> {
      // TODO: implement vectorized pow
      return vec4<${r}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},iC=t=>{ix(t,"Sub",(t,r)=>`${t}-${r}`)},iz=t=>{ix(t,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},iA=t=>{ix(t,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},iO=t=>{ix(t,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},iR=t=>{ix(t,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),iP=l(()=>{eY(),ta(),tB(),tY(),iM=(t,r)=>{let i=t.inputs,a=i[0].dims,s=e9.normalizeAxis(r.axis,a.length);var n=i,o=s;if(!n||n.length<1)throw Error("too few inputs");let u=n[0],l=u.dataType,d=u.dims.length;n.forEach((t,r)=>{if(0!==r){if(t.dataType!==l)throw Error("input tensors should be one type");if(t.dims.length!==d)throw Error("input tensors should have the same shape");t.dims.forEach((t,r)=>{if(r!==o&&t!==u.dims[r])throw Error("non concat dimensions must match")})}});let p=a.slice();p[s]=i.reduce((t,r)=>t+(r.dims.length>s?r.dims[s]:0),0);let c=i.filter(t=>e9.size(t.dims)>0);t.compute(((t,r,i,a)=>{let s=e9.size(i),n=Array(t.length),o=Array(t.length),u=0,l=[],d=[],p=[{type:12,data:s}];for(let i=0;i<t.length;++i)u+=t[i].dims[r],n[i]=u,d.push(t[i].dims.length),o[i]=tj(`input${i}`,a,d[i]),l.push("rank"),p.push({type:12,data:n[i]});for(let r=0;r<t.length;++r)p.push(...tN(t[r].dims));p.push(...tN(i));let c=tH("output",a,i.length),h=c.indicesGet("indices",r),f=Array.from(Array(n.length).keys()).map(t=>`uniforms.sizeInConcatAxis${t}`).join(",");return{name:"Concat",shaderCache:{hint:`${r}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:a}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:r=>{let i,a;return`

  ${(()=>{r.registerUniform("outputSize","u32");for(let i=0;i<t.length;i++)r.registerUniform(`sizeInConcatAxis${i}`,"u32");return r.declareVariables(...o,c)})()}

  ${i=n.length,a=f,`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${i}u>(${a});
    for (var i: u32 = 0u; i < ${i}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${i}u;
  }`}

  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${c.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${h});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${f});
      ${h} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${((t,r)=>{let i=t.length,a=[];for(let s=0;s<i;++s){let n=r.setByOffset("global_idx",t[s].getByIndices("indices"));1===i?a.push(n):0===s?a.push(`if (inputIndex == ${s}u) { ${n} }`):s===i-1?a.push(`else { ${n} }`):a.push(`else if (inputIndex == ${s}) { ${n} }`)}return a.join(`
`)})(o,c)}
  }`}}})(c,s,p,i[0].dataType),{inputs:c})},iD=t=>tR({axis:t.axis})}),iq=l(()=>{eY(),ta(),iU=(t,r,i="f32")=>{switch(t.activation){case"Relu":return`value = max(value, ${r}(0.0));`;case"Sigmoid":return`value = (${r}(1.0) / (${r}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${r}(${i}(uniforms.clip_min)), ${r}(${i}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${r}(0.0), min(${r}(1.0), ${i}(uniforms.alpha) * value + ${i}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${i}(uniforms.alpha) * value, value, value >= ${r}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw Error(`Unsupported activation ${t.activation}`)}},iN=(t,r)=>{"Clip"===t.activation?r.push({type:1,data:t.clipMax},{type:1,data:t.clipMin}):"HardSigmoid"===t.activation?r.push({type:1,data:t.alpha},{type:1,data:t.beta}):"LeakyRelu"===t.activation&&r.push({type:1,data:t.alpha})},iL=(t,r)=>{"Clip"===t.activation?r.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):"HardSigmoid"===t.activation?r.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):"LeakyRelu"===t.activation&&r.push({name:"alpha",type:"f32"})},iV=t=>{let r=t?.activation||"";if("HardSigmoid"===r){let[i,a]=t?.activation_params||[.2,.5];return{activation:r,alpha:i,beta:a}}if("Clip"===r){let[i,a]=t?.activation_params||[tr,ti];return{activation:r,clipMax:a,clipMin:i}}if("LeakyRelu"===r){let[i]=t?.activation_params||[.01];return{activation:r,alpha:i}}return{activation:r}}}),iG=l(()=>{iF=(t,r)=>{switch(t){case 1:return r;case 2:return`vec2<${r}>`;case 3:return`vec3<${r}>`;case 4:return`vec4<${r}>`;default:throw Error(`${t}-component is not supported.`)}},iW=t=>`
      ${t?"value = value + getBiasByOutputCoords(coords);":""}
      `}),iH=l(()=>{ij=t=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${t}.x), i32(${t}.y), i32(${t}.z), 1));
}
`}),iQ=l(()=>{eY(),ta(),tY(),iq(),iK=(t,r,i,a,s)=>{let n=a-i;return`
      ${Array.from({length:i}).map((i,o)=>`
      if (${tW(r.shape,o,r.rank)} != 1) {
        ${r.indicesSet(t,o,tW(s,o+n,a))}
      } else {
        ${r.indicesSet(t,o,0)}
      }`).join("")}
`},iZ=(t,r,i,a,s=!1,n)=>{let o=t[0].dims,u=t[1].dims,l=o[o.length-2],d=u[u.length-1],p=o[o.length-1],c=tL(d),h=tL(p),f=tL(l),m=e9.size(i)/c/f,g=t.length>2,y=a?a.slice(0,-2):i.slice(0,-2),_=[e9.size(y),l,d],b=[{type:12,data:m},{type:12,data:l},{type:12,data:d},{type:12,data:p}];return iN(r,b),b.push(...tN(y,o,u)),g&&b.push(...tN(t[2].dims)),b.push(...tN(_)),{name:"MatMulNaive",shaderCache:{hint:`${r.activation};${c};${h};${f};${s}`,inputDependencies:g?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(i):i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:b}),getShaderSource:a=>{let n=tZ("batch_dims",t[0].dataType,y.length),l=tj("a",t[0].dataType,o.length,h),d=tj("b",t[1].dataType,u.length,c),p=tH("output",t[0].dataType,_.length,c),m=tP(p.type.tensor),b=iU(r,p.type.value,m),$=[l,d],w="";if(g){let r=s?c:1;$.push(tj("bias",t[2].dataType,t[2].dims.length,r)),w=`${s?`value += bias[col / ${r}];`:`value += ${p.type.value}(bias[row + i]);`}`}let v=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];return iL(r,v),`
  ${a.registerUniforms(v).registerInternalVariables(n).declareVariables(...$,p)}
  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${c})) * ${c};
    var index1 = global_idx / (uniforms.N / ${c});
    let stride1 = uniforms.M / ${f};
    let row = (index1 % stride1) * ${f};
    let batch = index1 / stride1;

    ${2===i.length?"":`let batch_indices = ${n.offsetToIndices("batch")};`}

    var a_indices: ${l.type.indices};
    ${iK("a_indices",l,l.rank-2,n.rank,"batch_indices")}
    ${l.indicesSet("a_indices",l.rank-2,0)}
    ${l.indicesSet("a_indices",l.rank-1,0)}
    let a_offset = ${l.indicesToOffset("a_indices")};

    var b_indices: ${d.type.indices};
    ${iK("b_indices",d,d.rank-2,n.rank,"batch_indices")}
    ${d.indicesSet("b_indices",d.rank-2,0)}
    ${d.indicesSet("b_indices",d.rank-1,0)}
    let b_offset = ${d.indicesToOffset("b_indices")};
    var values: array<${p.type.value}, ${f}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${h}) {
      ${(()=>{let t=`var a_data: ${l.type.value};`;for(let r=0;r<h;r++)t+=`
              let b_data${r} = b[(b_offset + (k + ${r}) * uniforms.N + col) / ${c}];`;for(let r=0;r<f;r++){t+=`a_data = a[(a_offset + (row + ${r}) * uniforms.K + k) / ${h}];`;for(let i=0;i<h;i++)t+=`
            values[${r}] = fma(${d.type.value}(a_data${1===h?"":`[${i}]`}), b_data${i}, values[${r}]);
`}return t})()}
    }
    for (var i = 0u; i < ${f}u; i++) {
      var value = values[i];
      ${w}
      ${b}
      let cur_indices = ${p.type.indices}(batch, row + i, col);
      let offset = ${p.indicesToOffset("cur_indices")};
      ${p.setByOffset(`offset / ${c}`,"value")};
    }
  }
  `}}}}),i1=l(()=>{eY(),ta(),tY(),iq(),iQ(),iG(),iX=(t,r,i="f32",a,s=!1,n=32,o=!1,u=32)=>{let l,d,p,c,h=r[1]*t[1],f=r[0]*t[0],m=s?h:n,g=s?n:h,y=m/r[0],_=n/r[1];if(!((s&&4===y&&4===t[1]||!s&&(3===y||4===y))&&m%r[0]==0&&n%r[1]==0&&4===t[0]))throw Error(`If transposeA ${s} is true, innerElementSize ${y} and workPerThread[1] ${t[1]} must be 4.
      Otherwise, innerElementSize ${y} must be 3 or 4.
  tileAWidth ${m} must be divisible by workgroupSize[0]${r[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${r[1]}. colPerThread ${t[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${y}<${i}>, ${m/y}>, ${g}>;
var<workgroup> mm_Bsub: array<array<vec4<${i}>, ${f/t[0]}>, ${n}>;

const rowPerThread = ${t[1]};
const colPerThread = ${t[0]};
const innerElementSize = ${y};
const tileInner = ${n};

@compute @workgroup_size(${r[0]}, ${r[1]}, ${r[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${o?"0":"i32(globalId.z)"};
  ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${h};

  let num_tiles = ${o?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${i}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${l=s,d=a,l?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${d?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${d?", batchIndices":""});
        `}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${a?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${3===y?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${p=s,c=y,p?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${3===c?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${3===c?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${3===c?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},iY=(t,r)=>t?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${r?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${r?", batchIndices":""});
            `,iJ=(t,r,i="f32",a,s=!1,n=32,o=!1,u=32,l=!1)=>{let d=t[1]*r[1],p=t[0]*r[0],c=s?d:n,h=s?n:d;if(h%r[1]!=0||c%r[0]!=0||n%r[1]!=0)throw Error(`tileAHight ${h} must be divisible by workgroupSize[1]${r[1]}, tileAWidth ${c} must be divisible by workgroupSize[0]${r[0]}, tileInner ${n} must be divisible by workgroupSize[1]${r[1]}`);let f=h/r[1],m=c/r[0],g=n/r[1],y=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${p};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${h}; inputRow = inputRow + ${r[1]}) {
        for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${r[0]}) {
          ${iY(s,a)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${r[1]}) {
            for (var inputCol = localCol; inputCol < ${p}; inputCol = inputCol + ${r[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${a?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${i}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${r[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${s?`mm_Asub[k][localRow + innerRow * ${r[1]}];`:`mm_Asub[localRow + innerRow * ${r[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${r[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${r[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${f};
let tileColA = i32(localId.x) * ${m};
let tileRowB = i32(localId.y) * ${g};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${f}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${m}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${iY(s,a)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${g}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${a?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${i}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${s?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];"}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${i}, ${c}>, ${h}>;
  var<workgroup> mm_Bsub : array<array<${i}, ${p}>, ${n}>;
  const rowPerThread = ${t[1]};
  const colPerThread = ${t[0]};
  const tileInner = ${n};

@compute @workgroup_size(${r[0]}, ${r[1]}, ${r[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${o?"0":"i32(globalId.z)"};
    ${a?`let batchIndices = ${a.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${o?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${o?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${i}, colPerThread>, rowPerThread>;
    ${y}
  }
`},i0=(t,r,i,a,s=!1,n)=>{let o=t[0].dims,u=t[1].dims,l=o.slice(0,-2),d=u.slice(0,-2),p=a?a.slice(0,-2):i.slice(0,-2),c=e9.size(p),h=o[o.length-2],f=o[o.length-1],m=u[u.length-1],g=f%4==0&&m%4==0,y=h<=8?[4,1,1]:[4,4,1],_=[8,8,1],b=[Math.ceil(m/_[0]/y[0]),Math.ceil(h/_[1]/y[1]),Math.ceil(c/_[2]/y[2])],$=g?4:1,w=[...l,h,f/$],v=w.length,x=[...d,f,m/$],S=x.length,T=[c,h,m/$],E=[{type:6,data:h},{type:6,data:m},{type:6,data:f}];iN(r,E),E.push(...tN(p,w,x));let k=["rank","rank"],I=t.length>2;return I&&(E.push(...tN(t[2].dims)),k.push("rank")),E.push(...tN(T)),{name:"MatMul",shaderCache:{hint:`${y};${r.activation};${g};${s}`,inputDependencies:k},getRunData:()=>({outputs:[{dims:n?n(i):i,dataType:t[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:E}),getShaderSource:i=>{let a=p.length,n=tZ("batchDims",t[0].dataType,a,1),o=tP(t[0].dataType),u=tj("a",t[0].dataType,v,$),l=tj("b",t[1].dataType,S,$),d=tH("result",t[0].dataType,T.length,$),c=[u,l];if(I){let r=s?$:1;c.push(tj("bias",t[2].dataType,t[2].dims.length,r))}let h=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];iL(r,h);let f=tP(d.type.tensor),m=((t,r,i,a,s=!1)=>{let[n,o,u,l]=a,d=tP(a[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${iF(t,d)} {
      var value = ${iF(t,d)}(0.0);
      let col = colIn * ${t};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${o.type.indices};
        ${iK("aIndices",o,o.rank-2,n.rank,"batchIndices")}
        ${o.indicesSet("aIndices",o.rank-2,"u32(row)")}
        ${o.indicesSet("aIndices",o.rank-1,"u32(colIn)")}
        value = ${o.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${iF(t,d)} {
      var value = ${iF(t,d)}(0.0);
      let col = colIn * ${t};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${iK("bIndices",u,u.rank-2,n.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${iF(t,d)}) {
      let col = colIn * ${t};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${r?`value = value + ${s?"bias[colIn]":`${iF(t,d)}(bias[row])`};`:""}
        ${i}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `})($,I,iU(r,d.type.value,f),[n,u,l,d],s);return`
  ${i.registerUniforms(h).registerInternalVariables(n).declareVariables(...c,d)}
  ${m}
  ${g?iX(y,_,o,n):iJ(y,_,o,n)}
                   `}}}}),i3=l(()=>{eY(),e8(),tY(),iq(),iG(),iH(),i1(),i2=(t,r,i,a,s,n,o,u,l)=>{let d="NHWC"===r.format,p=d?t[0].dims[3]:t[0].dims[1],c=i[0],h=d?i[2]:i[3],f=d?i[1]:i[2],m=d?i[3]:i[1],g=d&&(p%4==0||p%3==0)&&m%4==0,y=d?m:h*f,_=d?h*f:m,b=[8,8,1],$=a<=8?[4,1,1]:[4,4,1],w=[Math.ceil(y/b[0]/$[0]),Math.ceil(_/b[1]/$[1]),Math.ceil(c/b[2]/$[2])];e6("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${w}`);let v=g?d&&p%4!=0?3:4:1,x=b[1]*$[1],S=b[0]*$[0],T=Math.max(b[0]*v,b[1]),E=a%x==0,k=s%S==0,I=n%T==0,C=g?[v,4,4]:[1,1,1],z=[{type:6,data:a},{type:6,data:s},{type:6,data:n},{type:6,data:[r.pads[0],r.pads[1]]},{type:6,data:r.strides},{type:6,data:r.dilations}];iN(r,z),z.push(...tN(t[0].dims,t[1].dims));let A=["rank","rank"];return o&&(z.push(...tN(t[2].dims)),A.push("rank")),z.push(...tN(i)),{name:"Conv2DMatMul",shaderCache:{hint:`${r.cacheKey};${v};${g};${E};${k};${I};${x};${S};${T}`,inputDependencies:A},getRunData:()=>({outputs:[{dims:l?l(i):i,dataType:t[0].dataType}],dispatchGroup:{x:w[0],y:w[1],z:w[2]},programUniforms:z}),getShaderSource:a=>{let s=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];iL(r,s);let n=g?4:1,l=tP(t[0].dataType),p=`
      fn setOutputAtIndex(flatIndex : i32, value : ${g?`vec4<${l}>`:l}) {
        result[flatIndex] = ${g?`vec4<${l}>`:l}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${g?`vec4<${l}>`:l}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${g?"/ 4":""}, value);
      }`,c=[tj("x",t[0].dataType,t[0].dims.length,3===v?1:v),tj("w",t[1].dataType,t[1].dims.length,n)],h=tH("result",t[0].dataType,i.length,n);if(o){let r=tj("bias",t[2].dataType,t[2].dims.length,n);c.push(r),p+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${g?`vec4<${l}>`:l} {
          return bias[coords.${d?"w":"y"}${g?"/ 4":""}];
        }`}return`
        ${ij("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${a.registerUniforms(s).declareVariables(...c,h)}
        ${p}
        ${((t,r,i,a,s=!1,n,o=4,u=4,l=4,d="f32")=>{let p=t=>{switch(t){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw Error(`innerElementSize ${t} is not supported.`)}},c=t?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,h=t?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,f=t?"row":"col",m=t?"col":"row",g=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${f} / outWidth;
    let outCol = ${f} % outWidth;

    let WRow = ${m} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${m} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${m} % inChannels;
    var resData = ${iF(o,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${t?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])"} && xCol >= 0 && xCol < ${t?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])"}) {
      ${c}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${(t=>{switch(t){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw Error(`innerElementSize ${t} is not supported.`)}})(o)}
    }
    return resData;`,y=t?r&&a?`
    let col = colIn * ${o};
    ${g}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${g}
    }
    return ${iF(o,d)}(0.0);`:a&&i?`
    let col = colIn * ${o};
    ${g}`:`
    let col = colIn * ${o};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${g}
    }
    return ${iF(o,d)}(0.0);`,_=t?a&&i?p(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${p(u)}
    }
    return ${iF(u,d)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${p(u)}
    }
    return ${iF(u,d)}(0.0);`,b=iF(l,d),$=t?iF(o,d):iF(u,d),w=t?iF(u,d):iF(o,d),v=iU(n,b,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${$} {
      ${t?y:_}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${w} {
      ${t?_:y}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${b}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${t?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${h}
      ${iW(s)}
      ${v}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`})(d,E,k,I,o,r,C[0],C[1],C[2],l)}
        ${g?iX($,b,l,void 0,!d,T):iJ($,b,l,void 0,!d,T,!1,void 0,u)}`}}}}),i9=l(()=>{eY(),e8(),ta(),tY(),iq(),iG(),i4=t=>"number"==typeof t?[t,t,t]:t,i6=(t,r)=>r<=1?t:t+(t-1)*(r-1),i8=(t,r,i,a,s)=>{null==s&&(s=((t,r,i,a=1)=>{let s=i6(r,a);return Math.floor((t[0]*(i-1)-i+s)/2)})(t,r[0],a[0]));let n=[0,0,0,i];for(let i=0;i<3;i++)t[i]+2*s>=r[i]&&(n[i]=Math.trunc((t[i]-r[i]+2*s)/a[i]+1));return n},i5=(t,r,i,a,s,n=!1,o="channelsLast")=>{let u,l,d,p,c;if("channelsLast"===o)[u,l,d,p,c]=t;else if("channelsFirst"===o)[u,c,l,d,p]=t;else throw Error(`Unknown dataFormat ${o}`);let[h,,f,m,g]=r,[y,_,b]=i4(i),[$,w,v]=i4(a),x=i6(f,$),S=i6(m,w),T=i6(g,v),{padInfo:E,outDepth:k,outHeight:I,outWidth:C}=((t,r,i,a,s,n,o,u,l,d)=>{let p,c,h,f;if("VALID"===t&&(t=0),"number"==typeof t){p={top:t,bottom:t,left:t,right:t,front:t,back:t};let m=i8([r,i,a,1],[u,l,d],1,[s,n,o],t);c=m[0],h=m[1],f=m[2]}else if(Array.isArray(t)){if(!t.every((t,r,i)=>t===i[0]))throw Error(`Unsupported padding parameter: ${t}`);p={top:t[0],bottom:t[1],left:t[2],right:t[3],front:t[4],back:t[5]};let m=i8([r,i,a,1],[u,l,d],1,[s,n,o],t[0]);c=m[0],h=m[1],f=m[2]}else if("SAME_UPPER"===t){c=Math.ceil(r/s),h=Math.ceil(i/n),f=Math.ceil(a/o);let t=(c-1)*s+u-r,m=(h-1)*n+l-i,g=(f-1)*o+d-a,y=Math.floor(t/2),_=Math.floor(m/2),b=Math.floor(g/2);p={top:_,bottom:m-_,left:b,right:g-b,front:y,back:t-y}}else throw Error(`Unknown padding parameter: ${t}`);return{padInfo:p,outDepth:c,outHeight:h,outWidth:f}})(s,l,d,p,y,_,b,x,S,T),z=n?h*c:h,A=[0,0,0,0,0];return"channelsFirst"===o?A=[u,z,k,I,C]:"channelsLast"===o&&(A=[u,k,I,C,z]),{batchSize:u,dataFormat:o,inDepth:l,inHeight:d,inWidth:p,inChannels:c,outDepth:k,outHeight:I,outWidth:C,outChannels:z,padInfo:E,strideDepth:y,strideHeight:_,strideWidth:b,filterDepth:f,filterHeight:m,filterWidth:g,effectiveFilterDepth:x,effectiveFilterHeight:S,effectiveFilterWidth:T,dilationDepth:$,dilationHeight:w,dilationWidth:v,inShape:t,outShape:A,filterShape:r}},i7=(t,r,i,a,s,n)=>{let o="channelsLast"===n,u=[Math.ceil((t=>{let r=1;for(let i=0;i<t.length;i++)r*=t[i];return r})((o?t[0].dims[3]:t[0].dims[1],{x:i.map((t,r)=>r)}).x.map(t=>i[t]))/64),1,1];e6("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${u}`);let l=[{type:12,data:e9.size(i)},{type:12,data:a},{type:12,data:s},{type:12,data:r.strides},{type:12,data:r.dilations}];iN(r,l),l.push(...tN(t[0].dims,t[1].dims));let d=["rank","rank"],p=3===t.length;return p&&(l.push(...tN(t[2].dims)),d.push("rank")),l.push(...tN(i)),{name:"Conv3DNaive",shaderCache:{hint:`${r.cacheKey};${o};1;${p}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:i,dataType:t[0].dataType}],dispatchGroup:{x:u[0],y:u[1],z:u[2]},programUniforms:l}),getShaderSource:n=>{let u=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:a.length},{name:"pads",type:"u32",length:s.length},{name:"strides",type:"u32",length:r.strides.length},{name:"dilations",type:"u32",length:r.dilations.length}];iL(r,u);let l=tP(t[0].dataType),d=tj("x",t[0].dataType,t[0].dims.length,1),c=tj("W",t[1].dataType,t[1].dims.length,1),h=[d,c],f=tH("result",t[0].dataType,i.length,1),m="";if(p){let r=tj("bias",t[2].dataType,t[2].dims.length,1);h.push(r),m+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l} {
          return bias[${o?tW("coords",4,5):tW("coords",1,5)}];
        }`}let g=iF(1,l),y=iU(r,g,l);return`
            ${m}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${d.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${c.getByIndices("aIndices")};
            }
          ${n.registerUniforms(u).declareVariables(...h,f)}
          ${n.mainStart()}
          ${n.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${f.offsetToIndices("global_idx")};
              let batch = ${tW("coords",0,d.rank)};
              let d2 = ${o?tW("coords",d.rank-1,d.rank):tW("coords",1,d.rank)};
              let xFRCCorner = vec3<u32>(${o?tW("coords",1,d.rank):tW("coords",2,d.rank)},
              ${o?tW("coords",2,d.rank):tW("coords",3,d.rank)},
              ${o?tW("coords",3,d.rank):tW("coords",4,d.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${o?tW("uniforms.x_shape",1,d.rank):tW("uniforms.x_shape",2,d.rank)};
              let xShapeZ = ${o?tW("uniforms.x_shape",2,d.rank):tW("uniforms.x_shape",3,d.rank)};
              let xShapeW = ${o?tW("uniforms.x_shape",3,d.rank):tW("uniforms.x_shape",4,d.rank)};
              let xShapeU = ${o?tW("uniforms.x_shape",4,d.rank):tW("uniforms.x_shape",1,d.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${o?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${o?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${o?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${o?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${p?"value = value + getBiasByOutputCoords(coords)":""};
              ${y}
              result[global_idx] = f32(value);
          }`}}}}),ar=l(()=>{eY(),ta(),tY(),iq(),ae=(t,r,i,a)=>{let s=t.length>2,n=s?"value += b[output_channel];":"",o=t[0].dims,u=t[1].dims,l="NHWC"===r.format,d=l?i[3]:i[1],p=d/r.group,c=l&&p>=4?tL(d):1,h=e9.size(i)/c,f=[{type:12,data:h},{type:12,data:r.dilations},{type:12,data:[r.strides[0],r.strides[1]]},{type:12,data:[r.pads[0],r.pads[1]]},{type:12,data:p}];return iN(r,f),f.push(...tN(o,[u[0],u[1],u[2],u[3]/c])),f.push(...tN([i[0],i[1],i[2],i[3]/c])),{name:"GroupedConv",shaderCache:{hint:`${r.cacheKey}_${c}`,inputDependencies:s?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(i):i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:f}),getShaderSource:a=>{let d=tH("output",t[0].dataType,i.length,c),p=tP(d.type.tensor),h=iU(r,d.type.value,p),f=tj("x",t[0].dataType,o.length),m=tj("w",t[1].dataType,u.length,c),g=[f,m];s&&g.push(tj("b",t[2].dataType,t[2].dims,c));let y=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:r.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];iL(r,y);let _=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${f.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${m.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${f.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${m.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${a.registerUniforms(y).declareVariables(...g,d)}

  ${a.mainStart()}
    ${a.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${d.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${c} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${d.type.value} = ${d.type.value}(0);
    ${_}
    ${n}
    ${h}
    ${d.setByOffset("global_idx","value")}
  }`}}},at=(t,r,i,a)=>{let s=t.length>2,n=tL(i[3]),o=tL(i[2]),u=e9.size(i)/n/o,l=[t[0].dims[0],t[0].dims[1],t[0].dims[2],t[0].dims[3]/n],d=[t[1].dims[0],t[1].dims[1],t[1].dims[2],t[1].dims[3]/n],p=[i[0],i[1],i[2],i[3]/n],c=[{type:12,data:u},{type:6,data:[r.strides[0],r.strides[1]]},{type:6,data:[r.pads[0],r.pads[1]]}];iN(r,c),c.push(...tN(l,d,p));let h=(o-1)*r.strides[1]+d[1];return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${r.cacheKey};${n};${o};${h};${d[0]};${d[1]}`,inputDependencies:s?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:a?a(i):i,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:c}),getShaderSource:i=>{let a=tH("output",t[0].dataType,p.length,n),u=tP(a.type.tensor),c=iU(r,a.type.value,u),f=tj("x",t[0].dataType,l.length,n),m=tj("w",t[1].dataType,d.length,n),g=[f,m];s&&g.push(tj("b",t[2].dataType,t[2].dims,n));let y=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return iL(r,y),`
  ${i.registerUniforms(y).declareVariables(...g,a)}
  ${i.mainStart()}
    ${i.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${o}u;
    let col = (index1 % width1) * ${o}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${f.type.value}, ${h}>;
    var values: array<${a.type.value}, ${o}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${h}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${f.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${f.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${m.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${o}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${o}u; i++) {
      var value = values[i];
      ${s?"value += b[output_channel];":""}
      ${c}
      ${a.set("batch","row","col + i","output_channel","value")};
    }
  }`}}}}),au=l(()=>{ta(),i3(),i9(),i1(),ar(),iq(),iQ(),t3(),ai=[2,3,1,0],aa=(t,r)=>{let i=t.kernelShape.slice();i.length<r[1].dims.length-2&&i.push(...Array(r[1].dims.length-2-i.length).fill(0));for(let t=2;t<r[1].dims.length;++t)0===i[t-2]&&(i[t-2]=r[1].dims[t]);let a=t.pads.slice();te.adjustPadsBasedOnAutoPad(r[0].dims,t.strides,t.dilations,i,a,"NHWC"===t.format,t.autoPad);let s=Object.assign({},t);return Object.assign(s,{kernelShape:i,pads:a}),s},as=t=>{let r=iV(t),i=t.format;return{autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][t.auto_pad],format:i,dilations:t.dilations,group:t.group,kernelShape:t.kernel_shape,pads:t.pads,strides:t.strides,wIsConst:t.w_is_const(),...r,cacheKey:`${t.format};${r.activation};`}},an=(t,r,i,a)=>{var s,n,o,u,l,d;let p,c,h,f,m,g,y="NHWC"===i.format,_=(s=r[0].dims,n=r[1].dims,o=i.dilations,u=i.pads,l=i.strides,d=y,p=s[0],h=(c=s.slice(d?1:2,d?3:4)).length,f=n[0],m=n.slice(2).map((t,r)=>t+(t-1)*(o[r]-1)),(g=c.map((t,r)=>t+u[r]+u[r+h]).map((t,r)=>Math.floor((t-m[r]+l[r])/l[r]))).splice(0,0,p),g.splice(d?3:1,0,f),g);if(1!==i.group){let s=[r[0]];if(y){let a=t.kernelCustomData.wT??t.compute(t0(r[1],ai),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=a),s.push(a)}else s.push(r[1]);3===r.length&&s.push(r[2]),!t.adapterInfo.isArchitecture("ampere")&&y&&r[1].dims[0]===i.group&&1===r[1].dims[1]&&1===i.dilations[0]&&1===i.dilations[1]?t.compute(at(s,i,_,a),{inputs:s}):t.compute(ae(s,i,_,a),{inputs:s});return}let b=3===r.length,$=r[0].dims[y?1:2],w=r[0].dims[y?2:3],v=r[0].dims[y?3:1],x=r[1].dims[2],S=r[1].dims[3],T=_[y?1:2],E=_[y?2:3],k=_[y?3:1],I=y&&x===$&&S===w&&0===i.pads[0]&&0===i.pads[1];if(I||1===x&&1===S&&1===i.dilations[0]&&1===i.dilations[1]&&1===i.strides[0]&&1===i.strides[1]&&0===i.pads[0]&&0===i.pads[1]){let s=_[0],n,o,u,l=[];if(y){let a=t.kernelCustomData.wT??t.compute(t0(r[1],ai),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];if(i.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=a),I){let t=$*w*v;n=r[0].reshape([1,s,t]),o=a.reshape([1,t,k]),u=[1,s,k]}else n=r[0].reshape([s,$*w,v]),o=a.reshape([1,v,k]),u=[s,T*E,k];l.push(n),l.push(o)}else n=r[0].reshape([s,v,$*w]),o=r[1].reshape([1,k,v]),u=[s,k,T*E],l.push(o),l.push(n);b&&l.push(r[2]);let d=u[2],p=l[0].dims[l[0].dims.length-1];d<8&&p<8?t.compute(iZ(l,i,_,u,y,a),{inputs:l}):t.compute(i0(l,i,_,u,y,a),{inputs:l});return}let C=t.kernelCustomData.wT??t.compute(t0(r[1],ai),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=C);let z=[r[0],C];b&&z.push(r[2]);let A=y?T*E:k,O=y?k:T*E,R=x*S*v;t.compute(i2(z,i,_,A,O,R,b,!0,a),{inputs:z})},ao=(t,r)=>{var i,a,s,n,o;if(((t,r)=>{if(!t||2!==t.length&&3!==t.length)throw Error("Conv requires 2 or 3 inputs");if(t[0].dims.length>5)throw Error("greater than 5D is not supported");if(t[0].dims.length!==t[1].dims.length)throw Error("filter does not have same dimension as input");if(t[0].dims["NHWC"===r.format?t[0].dims.length-1:1]!==t[1].dims[1]*r.group)throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(3===t.length&&(1!==t[2].dims.length||t[1].dims[0]!==t[2].dims[0]))throw Error("invalid bias");let i=t[0].dims.length-2;if(r.dilations.length!==i)throw Error(`dilations should be ${i}D`);if(r.strides.length!==i)throw Error(`strides should be ${i}D`);if(r.pads.length!==2*i)throw Error(`pads should be ${2*i}D`);if(0!==r.kernelShape.length&&r.kernelShape.length!==t[1].dims.length-2)throw Error("invalid kernel shape")})(t.inputs,r),3===t.inputs[0].dims.length){let s,n,o,u,l,d,p;i=t,s="NHWC"===(a=r).format,n=[i.inputs[0].reshape(s?[i.inputs[0].dims[0],1,i.inputs[0].dims[1],i.inputs[0].dims[2]]:[i.inputs[0].dims[0],i.inputs[0].dims[1],1,i.inputs[0].dims[2]]),i.inputs[1].reshape([i.inputs[1].dims[0],i.inputs[1].dims[1],1,i.inputs[1].dims[2]])],3===i.inputs.length&&n.push(i.inputs[2]),o=[0,a.pads[0],0,a.pads[1]],u=[1].concat(a.strides),l=[1].concat(a.dilations),d=[1].concat(a.kernelShape),p=aa({...a,pads:o,strides:u,dilations:l,kernelShape:d},n),an(i,n,p,t=>s?[t[0],t[2],t[3]]:[t[0],t[1],t[3]])}else if(5===t.inputs[0].dims.length){let i,a,u,l;s=t,n=t.inputs,i="NHWC"===(o=r).format?"channelsLast":"channelsFirst",a=aa(o,n),u="NOTSET"===o.autoPad?o.pads:o.autoPad,l=i5(n[0].dims,n[1].dims,o.strides,o.dilations,u,!1,i),s.compute(i7(n,a,l.outShape,[l.filterDepth,l.filterHeight,l.filterWidth],[l.padInfo.front,l.padInfo.top,l.padInfo.left],i))}else{let i=aa(r,t.inputs);an(t,t.inputs,i)}}}),ad=l(()=>{eY(),e8(),ta(),tY(),al=(t,r,i)=>{let a=t.length>2,s=r.outputShape,n="NHWC"===r.format,o=r.group,u=t[1].dims,l=u[2]/o,d=u[3],p=n?tL(l):1,c=n&&1===d&&l>=4,h=c?4*Math.floor(l/4):Math.floor(l/p)*p,f=l-h,m=n?tL(d):1,g=n?1===d?p:m:1,y=e9.size(s)/m,_=[Math.ceil(y/64),1,1];e6("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${_}`);let b=["rank","rank"],$=[r.strides[0],r.strides[1]],w=[r.kernelShape[n?1:2],r.kernelShape[n?2:3]],v=[r.dilations[0],r.dilations[1]],x=[w[0]+(r.dilations[0]<=1?0:(r.kernelShape[n?1:2]-1)*(r.dilations[0]-1)),w[1]+(r.dilations[1]<=1?0:(r.kernelShape[n?2:3]-1)*(r.dilations[1]-1))],S=[x[0]-1-Math.floor((r.pads[0]+r.pads[2])/2),x[1]-1-Math.floor((r.pads[1]+r.pads[3])/2)],T=[{type:12,data:y},{type:12,data:$},{type:12,data:w},{type:12,data:v},{type:12,data:x},{type:6,data:S},{type:12,data:h},{type:12,data:l},{type:12,data:d},...tN(t[0].dims,t[1].dims)];return a&&(T.push(...tN(t[2].dims)),b.push("rank")),T.push(...tN(s)),{name:"ConvTranspose2D",shaderCache:{hint:`${r.cacheKey};${p}${g}${m}${c}${f}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:_[0],y:_[1],z:_[2]},outputs:[{dims:i?i(s):s,dataType:t[0].dataType}],programUniforms:T}),getShaderSource:r=>{let i=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:$.length},{name:"filter_dims",type:"u32",length:w.length},{name:"dilations",type:"u32",length:w.length},{name:"effective_filter_dims",type:"u32",length:x.length},{name:"pads",type:"i32",length:S.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],o=tP(t[0].dataType),u=n?1:2,l=n?2:3,d=n?3:1,h=tj("W",t[1].dataType,t[1].dims.length,g),y=tj("Dy",t[0].dataType,t[0].dims.length,p),_=[y,h];a&&_.push(tj("bias",t[2].dataType,[s[d]].length,m));let b=tH("result",t[0].dataType,s.length,m),v=`
            let outputIndices = ${b.offsetToIndices(`global_idx * ${m}`)};
            let batch = ${b.indicesGet("outputIndices",0)};
            let d1 = ${b.indicesGet("outputIndices",d)};
            let r = ${b.indicesGet("outputIndices",u)};
            let c = ${b.indicesGet("outputIndices",l)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${b.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${o}(dyRCorner) + ${o}(wR)) / ${o}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${o}(uniforms.Dy_shape[${u}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${o}(dyCCorner) + ${o}(wC)) / ${o}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${o}(uniforms.Dy_shape[${l}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${c?`
                var x_offset = ${y.indicesToOffset(`${y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p};
                var w_offset = ${h.indicesToOffset(`${h.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${g};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${c?4:p}) {
                  ${(()=>{let t="";if(c)4===p?t+=`
        let xValue = ${y.getByOffset("x_offset")};
        let wValue = ${h.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:2===p?t+=`
          dotProd = dotProd + dot(vec4<${o}>(${y.getByOffset("x_offset")}, ${y.getByOffset("x_offset + 1u")}), vec4<${o}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:1===p&&(t+=`
          dotProd = dotProd + dot(vec4<${o}>(${y.getByOffset("x_offset")}, ${y.getByOffset("x_offset + 1u")}, ${y.getByOffset("x_offset + 2u")}, ${y.getByOffset("x_offset + 3u")}), vec4<${o}>(${h.getByOffset("w_offset")}, ${h.getByOffset("w_offset + 1u")}, ${h.getByOffset("w_offset + 2u")}, ${h.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(t+=`
                  let xValue = ${n?y.getByOffset(`${y.indicesToOffset(`${y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${p}`):y.get("batch","inputChannel","idyR","idyC")};
        `,1===p)t+=`
          let w_offset = ${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${h.getByOffset(`w_offset / ${g}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let r=0;r<p;r++)t+=`
            let wValue${r} = ${h.getByOffset(`${h.indicesToOffset(`${h.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${r}, wOutChannel)`)} / ${g}`)};
            dotProd = dotProd + xValue[${r}] * wValue${r};`;return t})()}
                  inputChannel = inputChannel + ${c?4:p};
                }
                ${(()=>{if(0===f)return"";if(!c)throw Error(`packInputAs4 ${c} is not true.`);let t="";if(1===p){t+="dotProd = dotProd";for(let r=0;r<f;r++)t+=`
            + ${y.getByOffset(`x_offset + ${r}`)} * ${h.getByOffset(`w_offset + ${r}`)}`;t+=";"}else if(2===p){if(2!==f)throw Error(`Invalid inputChannelsRemainder ${f}.`);t+=`
          let xValue = ${y.getByOffset("x_offset")};
          let wValue = ${h.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return t})()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${a?` + bias[d1 / ${m}]`:""};
            ${b.setByOffset("global_idx","value")};
          `;return`
    ${r.registerUniforms(i).declareVariables(..._,b)}
      ${r.mainStart()}
      ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${v}}`}}}}),ay=l(()=>{ad(),iq(),t3(),ap=(t,r,i,a,s,n)=>(t-1)*r+i+(a-1)*s+1-n,ac=(t,r,i,a,s)=>{let n=Math.floor(t/2);"SAME_UPPER"===r?(i[a]=n,i[s]=t-n):"SAME_LOWER"===r&&(i[a]=t-n,i[s]=n)},ah=(t,r)=>{let i=t.kernelShape.slice();if(0===t.kernelShape.length||0===t.kernelShape.reduce((t,r)=>t*r,1)){i.length=0;for(let t=2;t<r[1].dims.length;++t)i.push(r[1].dims[t])}let a="NHWC"===t.format;i.splice(0,0,r[1].dims[0]),i.splice(a?3:1,0,r[1].dims[1]);let s=t.pads.slice(),n=t.outputShape.slice(),o=t.outputPadding.slice(),u=r[0].dims,l=t.dilations.slice();0===l.reduce((t,r)=>t+r,0)&&(l=Array(r[0].dims.length-2).fill(1));let d=t.strides.slice();0===d.reduce((t,r)=>t+r,0)&&(d=Array(r[0].dims.length-2).fill(1)),((t,r,i,a,s,n,o,u,l,d)=>{let p=t.length-2,c=0===d.length;l.length<p&&l.push(...Array(p-l.length).fill(0));let h=t[0],f=r[u?3:1]*s;for(let s=0,h=t.length-p-!!u;s<p;++s,++h){let u=t[h],f=c?u*o[s]:d[s];ac(ap(u,o[s],n[s],r[h],i[s],f),a,n,s,s+p),c&&d.push(o[s]*(u-1)+l[s]+(r[h]-1)*i[s]+1-n[s]-n[s+p])}d.splice(0,0,h),d.splice(u?3:1,0,f)})(u,i,l,t.autoPad,t.group,s,d,a,o,n);let p=Object.assign({},t);return Object.assign(p,{kernelShape:i,pads:s,outputPadding:o,outputShape:n,dilations:l,strides:d}),p},af=t=>{let r=iV(t),i=t.format,a=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof t.autoPad>"u"?0:t.autoPad],s=t.dilations,n=t.group??1,o=t.kernelShape,u=t.pads,l=t.strides,d=t.wIsConst();return{autoPad:a,format:i,dilations:s,group:n,kernelShape:o,outputPadding:t.outputPadding,outputShape:t.outputShape,pads:u,strides:l,wIsConst:d,...r,cacheKey:`${t.format};${r.activation};`}},am=(t,r,i,a)=>{let s=t.kernelCustomData.wT??t.compute(t0(r[1],[2,3,0,1]),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!t.kernelCustomData.wT&&(t.kernelCustomData.wT=s);let n=[r[0],s];3===r.length&&n.push(r[2]),t.compute(al(n,i,a),{inputs:n})},ag=(t,r)=>{if(((t,r)=>{if(!t||2!==t.length&&3!==t.length)throw Error("Conv requires 2 or 3 inputs");if(4!==t[0].dims.length&&3!==t[0].dims.length)throw Error("currently only support 2-dimensional conv");if(t[0].dims.length!==t[1].dims.length)throw Error("filter does not have same dimension as input");if(t[0].dims["NHWC"===r.format?t[0].dims.length-1:1]!==t[1].dims[0])throw Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let i=t[1].dims[1]*r.group;if(3===t.length&&(1!==t[2].dims.length||t[2].dims[0]!==i))throw Error("invalid bias");let a=t[0].dims.length-2;if(r.dilations.reduce((t,r)=>t+r,0)>0&&r.dilations.length!==a)throw Error(`dilations should be ${a}D`);if(r.strides.reduce((t,r)=>t+r,0)>0&&r.strides.length!==a)throw Error(`strides should be ${a}D`);if(r.pads.reduce((t,r)=>t+r,0)>0&&r.pads.length!==2*a)throw Error(`pads should be ${2*a}D`);if(r.outputPadding.length!==a&&0!==r.outputPadding.length)throw Error(`output_padding should be ${a}D`);if(r.kernelShape.reduce((t,r)=>t+r,0)>0&&0!==r.kernelShape.length&&r.kernelShape.length!==t[1].dims.length-2)throw Error("invalid kernel shape");if(0!==r.outputShape.length&&r.outputShape.length!==t[0].dims.length-2)throw Error("invalid output shape")})(t.inputs,r),3===t.inputs[0].dims.length){var i,a;let s,n,o,u,l,d,p,c;i=t,s="NHWC"===(a=r).format,n=[i.inputs[0].reshape(s?[i.inputs[0].dims[0],1,i.inputs[0].dims[1],i.inputs[0].dims[2]]:[i.inputs[0].dims[0],i.inputs[0].dims[1],1,i.inputs[0].dims[2]]),i.inputs[1].reshape([i.inputs[1].dims[0],i.inputs[1].dims[1],1,i.inputs[1].dims[2]])],3===i.inputs.length&&n.push(i.inputs[2]),(0===(o=a.kernelShape).length||0===o[0])&&(o=[i.inputs[1].dims[2]]),(0===(u=a.dilations).length||0===u[0])&&(u=[1]),(0===(l=a.strides).length||0===l[0])&&(l=[1]),0===(d=a.pads).length&&(d=[0,0]),d=[0,d[0],0,d[1]],l=[1].concat(l),u=[1].concat(u),o=[1].concat(o),p=[0].concat(p=a.outputPadding),c=ah({...a,pads:d,strides:l,dilations:u,kernelShape:o,outputPadding:p},n),am(i,n,c,t=>s?[t[0],t[2],t[3]]:[t[0],t[1],t[3]])}else{let i=ah(r,t.inputs);am(t,t.inputs,i)}}}),a$=l(()=>{eY(),ta(),tB(),tY(),a_=(t,r)=>{var i,a,s,n;let o,u,l,d,p,c,h=t.inputs[0].dims,f=t.inputs[0].dataType,m=t.inputs[1];t.compute((i=f,a=h,s=m,n=r,o=e9.size(a),u=a.length,l=tj("input",i,u),d=tH("output",i,u),p=6===s.dataType?s.getInt32Array()[0]:Number(s.getBigInt64Array()[0]),c=e9.normalizeAxis(p,u),{name:"CumSum",shaderCache:{hint:n.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:i}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:[{type:12,data:o},{type:12,data:c},...tN(a,a)]}),getShaderSource:t=>{let r=` i32(${l.indicesGet("inputIndices","uniforms.axis")}) `,i=tW("uniforms.input_shape","uniforms.axis",u),a=n.reverse?r+(n.exclusive?" + 1":""):"0",s=n.reverse?i:r+(n.exclusive?"":" + 1");return`
                ${t.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(l,d)}
                ${t.mainStart()}
                  ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${d.offsetToIndices("global_idx")};
                  var sum = ${d.type.value}(0);
                  let first : i32 = ${a};
                  let last : i32 = ${s};
                  for (var i : i32 = first; i < last; i++) {
                    ${l.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${l.getByIndices("inputIndices")};
                  }
                  ${d.setByOffset("global_idx","sum")};
                }`}}),{inputs:[0]})},ab=t=>{let r=1===t.exclusive,i=1===t.reverse;return tR({exclusive:r,reverse:i})}}),ax=l(()=>{eY(),ta(),tB(),tY(),aw=(t,r)=>{var i,a;let s,n,o,u,l,d,p,c,h,f,m,g,y,_;(t=>{if(!t||1!==t.length)throw Error("DepthToSpace requires 1 input.");if(4!==t[0].dims.length)throw Error("DepthToSpace requires 4D input.")})(t.inputs),t.compute((i=t.inputs[0],p="NHWC"===(a=r).format,c=a.blocksize,h="DCR"===a.mode,p?([s,n,o,u]=i.dims,l=h?[s,n,o,c,c,u/c**2]:[s,n,o,u/c**2,c,c],d=h?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([s,n,o,u]=[i.dims[0],i.dims[2],i.dims[3],i.dims[1]],l=h?[s,c,c,u/c**2,n,o]:[s,u/c**2,c,c,n,o],d=h?[0,3,4,1,5,2]:[0,1,4,2,5,3]),m=(f=i.reshape(l)).dims.length,g=i.dataType,y=tj("a",g,m),_=tH("output",g,m),{name:"DepthToSpace",shaderCache:{hint:`${i.dims};${a.blocksize};${a.mode}`,inputDependencies:["rank"]},getRunData:t=>{let r=p?[s,n*c,o*c,u/c**2]:[s,u/c**2,n*c,o*c],i=e9.size(r),a=f.dims,l=e9.sortBasedOnPerm(a,d);return{outputs:[{dims:r,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:[{type:12,data:i},...tN(a,l)]}},getShaderSource:t=>`
  ${t.registerUniform("output_size","u32").declareVariables(y,_)}

  ${((t,r,i,a)=>{let s=[];s.push(`fn perm(i: ${a.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`);for(let a=0;a<r;++a)s.push(i.indicesSet("a",t[a],`i[${a}]`));return s.push("return a;}"),s.join(`
`)})(d,m,y,_)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${_.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${_.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`}))},av=t=>tR({blocksize:t.blocksize,mode:t.mode,format:t.format})}),aO=l(()=>{eY(),ta(),tB(),tY(),aE="^"+(aT="("+(aS="[a-zA-Z]|\\.\\.\\.")+")+")+"$",ak="^"+("("+aT+",)*")+aT+"$",aI=class{constructor(t=-1){this.symbolToIndices=new Map,this.inputIndex=t}addSymbol(t,r){let i=this.symbolToIndices.get(t);void 0===i?i=[r]:i.push(r),this.symbolToIndices.set(t,i)}},aC=class{constructor(t,r){this.equation=r,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=[],this.outputDims=[];let[i,a]=r.includes("->")?r.split("->",2):[r,""];if(!i.match(RegExp(ak)))throw Error("Invalid LHS term");if(i.split(",").forEach((r,i)=>{let a=t[i].dims.slice();if(!r.match(RegExp(aE)))throw Error("Invalid LHS term");let s=this.processTerm(r,!0,a,i);this.lhs.push(s)}),""===a)a+=[...this.symbolToInfo.entries()].filter(([t,r])=>1===r.count||"..."===t).map(([t])=>t).join("");else if(!a.match(RegExp(aT)))throw Error("Invalid RHS");a.match(RegExp(aS,"g"))?.forEach(t=>{if("..."===t)this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let r=this.symbolToInfo.get(t);if(void 0===r)throw Error("Invalid RHS symbol");this.outputDims.push(r.dimValue)}}),this.rhs=this.processTerm(a,!1,this.outputDims)}addSymbol(t,r,i){let a=this.symbolToInfo.get(t);if(void 0!==a){if(a.dimValue!==r&&1!==a.count)throw Error("Dimension mismatch");a.count++,a.inputIndices.push(i)}else a={count:1,dimValue:r,inputIndices:[i]};this.symbolToInfo.set(t,a)}processTerm(t,r,i,a=-1){let s=i.length,n=!1,o=[],u=0;if(!t.match(RegExp(aE))&&!r&&""!==t)throw Error("Invalid LHS term");let l=t.match(RegExp(aS,"g")),d=new aI(a);return l?.forEach((t,p)=>{if("..."===t){if(n)throw Error("Only one ellipsis is allowed per input term");n=!0;let t=s-l.length+1;if(t<0)throw Error("Ellipsis out of bounds");if(o=i.slice(u,u+t),this.hasEllipsis){if(this.ellipsisDims.length!==o.length||this.ellipsisDims.toString()!==o.toString())throw Error("Ellipsis dimensions mismatch")}else if(r)this.hasEllipsis=!0,this.ellipsisDims=o;else throw Error("Ellipsis must be specified in the LHS");for(let t=0;t<o.length;t++){let r=String.fromCharCode(48+t);d.addSymbol(r,p+t),this.addSymbol(r,i[u++],a)}}else d.addSymbol(t,p+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(t,i[u++],a)}),d}},az=(t,r)=>{var i,a,s,n;let o,u,l,d,p=new aC(t.inputs,r.equation),c=p.outputDims,h=t.inputs.map((t,r)=>t.dims);t.compute((i=h,a=t.inputs[0].dataType,s=p,n=c,o=i.map(t=>t.length).map((t,r)=>tj(`input${r}`,a,t)),u=e9.size(n),l=tH("output",a,n.length),d=[...s.symbolToInfo.keys()].filter(t=>!s.rhs.symbolToIndices.has(t)),{name:"Einsum",shaderCache:{hint:s.equation,inputDependencies:i.map(()=>"rank")},getRunData:()=>{let t=d.filter(t=>s.symbolToInfo.has(t)).map(t=>({type:12,data:s.symbolToInfo.get(t)?.dimValue||0}));t.push({type:12,data:u});let r=i.map((t,r)=>[...tN(t)]).reduce((t,r)=>t.concat(r),t);return r.push(...tN(n)),{outputs:[{dims:n,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:r}},getShaderSource:t=>{let r=[],i=[],a=[],n=[],u=[],p=s.symbolToInfo.size===s.rhs.symbolToIndices.size;s.symbolToInfo.forEach((t,d)=>{if(s.rhs.symbolToIndices.has(d)){let i=s.rhs.symbolToIndices.get(d)?.[0];void 0!==i&&s.lhs.forEach((a,s)=>{if(t.inputIndices.includes(s)){let t=a.symbolToIndices.get(d);if(void 0===t)throw Error("Invalid symbol error");t.forEach(t=>{r.push(`${o[s].indicesSet(`input${s}Indices`,t,l.indicesGet("outputIndices",i))}`)})}})}else{let r;s.lhs.forEach((r,a)=>{if(t.inputIndices.includes(a)){let t=r.symbolToIndices.get(d);if(void 0===t)throw Error("Invalid symbol error");t.forEach(t=>{i.push(`${o[a].indicesSet(`input${a}Indices`,t,`${d}`)}`)}),u.push(`prod *= ${o[a].getByIndices(`input${a}Indices`)};`)}}),a.push(`for(var ${d}: u32 = 0; ${d} < uniforms.${(r=d)+"_max"}; ${d}++) {`),n.push("}")}});let c=p?[...r,`let sum = ${o.map((t,r)=>t.getByIndices(`input${r}Indices`)).join(" * ")};`]:[...r,"var sum = 0.0;",...a,...i,"var prod = 1.0;",...u,"sum += prod;",...n];return`
            ${t.registerUniforms(d.map(t=>{let r;return{name:`${(r=t)+"_max"}`,type:"u32"}})).registerUniform("outputSize","u32").declareVariables(...o,l)}

            ${t.mainStart()}
            ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${l.offsetToIndices("global_idx")};
            ${o.map((t,r)=>`var input${r}Indices: ${o[r].type.indices};`).join(`
`)}
            ${c.join(`
`)};
            ${l.setByOffset("global_idx","sum")};
          }`}}))},aA=t=>{let r=t.equation.replace(/\s+/g,"");return tR({equation:r})}}),aM=l(()=>{eY(),ta(),tY(),aR=(t,r)=>{let i=t.length-r.length,a=[];for(let r=0;r<i;++r)a.push(t[r]);for(let s=0;s<r.length;++s)a.push(1===r[s]?t[s+i]:r[s]);return a},aB=t=>{var r;let i,a,s,n,o,u,l,d,p,c;(t=>{if(!t||2!==t.length)throw Error("Expand requires 2 input.");let r=t[0].dims,i=Array.from(t[1].getBigInt64Array(),Number),a=i.length<r.length?0:i.length-r.length,s=r.length<i.length?0:r.length-i.length;for(;a<i.length&&s<r.length;++a,++s)if(i[a]!==r[s]&&1!==i[a]&&1!==r[s])throw Error("Expand requires shape to be broadcastable to input")})(t.inputs),t.compute((n=(i=s=(r=t.inputs)[0].dims,a=Array.from(r[1].getBigInt64Array(),Number),i.length>a.length?aR(i,a):aR(a,i)),u=9===(o=r[0].dataType)||1===e9.size(s),l=9===o||s.length>0&&s[s.length-1]%4==0?4:1,d=u||n.length>0&&n[n.length-1]%4==0?4:1,c=[{type:12,data:p=Math.ceil(e9.size(n)/d)},...tN(s,n)],{name:"Expand",shaderCache:{hint:`${n.length};${l}${d}`,inputDependencies:["rank"]},getShaderSource:t=>{let r=tj("input",o,s.length,l),i=tH("output",o,n.length,d),a;if(9===o){let t=(t,a,s="")=>`
          let outputIndices${a} = ${i.offsetToIndices(`outputOffset + ${a}u`)};
          let offset${a} = ${r.broadcastedIndicesToOffset(`outputIndices${a}`,i)};
          let index${a} = offset${a} / 4u;
          let component${a} = offset${a} % 4u;
          ${t}[${a}] = ${s}(${r.getByOffset(`index${a}`)}[component${a}]);
        `;a=`
        let outputOffset = global_idx * ${d};
        var data = vec4<u32>(0);
        ${t("data",0,"u32")}
        ${t("data",1,"u32")}
        ${t("data",2,"u32")}
        ${t("data",3,"u32")}
        ${i.setByOffset("global_idx","data")}
      }`}else a=`
        let outputIndices = ${i.offsetToIndices(`global_idx * ${d}`)};
        let inputOffset = ${r.broadcastedIndicesToOffset("outputIndices",i)};
        let data = ${i.type.value}(${r.getByOffset(`inputOffset / ${l}`)});
        ${i.setByOffset("global_idx","data")}
      }`;return`
    ${t.registerUniform("vec_size","u32").declareVariables(r,i)}
    ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${a}`},getRunData:()=>({outputs:[{dims:n,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c})}),{inputs:[0]})}}),aP=l(()=>{eY(),ta(),tY(),i$(),aD=t=>{var r;let i,a,s,n;t.inputs.length<2||0===e9.size(t.inputs[1].dims)?im(t):t.compute((i=(r=t.inputs)[0].dataType,a=e9.size(r[0].dims),n=(s=e9.size(r[1].dims))%4==0,{name:"FastGeluWithBias",shaderCache:{hint:`${n}`,inputDependencies:["type","type"]},getShaderSource:t=>{let r=tj("x",i,[1],4),a=tj("bias",i,[1],4),s=tH("y",i,[1],4),o=t=>`
      let bias${t}_offset: u32 = (global_idx * 4 + ${t}) % uniforms.bias_size;
      let bias${t} = ${a.getByOffset(`bias${t}_offset / 4`)}[bias${t}_offset % 4];`,u=n?`
      let bias = ${a.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${o(0)}${o(1)}${o(2)}${o(3)}
      let bias = ${r.type.value}(bias0, bias1, bias2, bias3);`;return`${t.registerUniforms([{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}]).declareVariables(r,a,s)}

    ${ic(tU(i))}

    ${t.mainStart(tM)}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${r.getByOffset("global_idx")};
      ${u}
      let x_in = x + bias;
      ${s.setByOffset("global_idx",ih("x_in"))}
    }`},getRunData:t=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],programUniforms:[{type:12,data:Math.ceil(a/4)},{type:12,data:s}],dispatchGroup:{x:Math.ceil(a/tM/4)}})}))}}),aL=l(()=>{eY(),ta(),tB(),tY(),aU=t=>tR({axis:t.axis}),aN=(t,r)=>{var i,a;let s,n,o,u,l,d,p,c,h;(t=>{if(!t||2!==t.length)throw Error("Gather requires 2 inputs.")})(t.inputs),t.compute((i=t.inputs,a=r,s=i[0].dims,n=i[1].dims,o=s.length,u=e9.normalizeAxis(a.axis,o),(l=s.slice(0)).splice(u,1,...n),d=s[u],p=9===i[0].dataType?4:1,h=[{type:12,data:c=Math.ceil(e9.size(l)/p)},{type:6,data:d},{type:12,data:u},...tN(i[0].dims,i[1].dims,l)],{name:"Gather",shaderCache:{hint:a.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:l,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:h}),getShaderSource:t=>{let r=tj("data",i[0].dataType,i[0].dims.length,p),a=tj("inputIndices",i[1].dataType,i[1].dims.length),s=tH("output",i[0].dataType,l.length,p),d=t=>{let i=n.length,s=`var indicesIndices${t}  = ${a.type.indices}(0);`;for(let r=0;r<i;r++)s+=`${i>1?`indicesIndices${t}[${r}]`:`indicesIndices${t}`} = ${l.length>1?`outputIndices${t}[uniforms.axis + ${r}]`:`outputIndices${t}`};`;s+=`
          var idx${t} = ${a.getByIndices(`indicesIndices${t}`)};
          if (idx${t} < 0) {
            idx${t} = idx${t} + uniforms.axisDimLimit;
          }
          var dataIndices${t} : ${r.type.indices};
        `;for(let r=0,a=0;r<o;r++)r===u?(s+=`${o>1?`dataIndices${t}[${r}]`:`dataIndices${t}`} = u32(idx${t});`,a+=i):(s+=`${o>1?`dataIndices${t}[${r}]`:`dataIndices${t}`} = ${l.length>1?`outputIndices${t}[${a}]`:`outputIndices${t}`};`,a++);return s},c;if(9===i[0].dataType){let t=(t,i,a="")=>`
          let outputIndices${i} = ${s.offsetToIndices(`outputOffset + ${i}u`)};
          ${d(i)};
          let offset${i} = ${r.indicesToOffset(`dataIndices${i}`)};
          let index${i} = offset${i} / 4u;
          let component${i} = offset${i} % 4u;
          ${t}[${i}] = ${a}(${r.getByOffset(`index${i}`)}[component${i}]);
        `;c=`
        let outputOffset = global_idx * ${p};
        var value = vec4<u32>(0);
        ${t("value",0,"u32")}
        ${t("value",1,"u32")}
        ${t("value",2,"u32")}
        ${t("value",3,"u32")}
        ${s.setByOffset("global_idx","value")}
      `}else c=`
      let outputIndices = ${s.offsetToIndices("global_idx")};
      ${d("")};
      let value = ${r.getByIndices("dataIndices")};
      ${s.setByOffset("global_idx","value")};
      `;return`
      ${t.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(r,a,s)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${c}
      }`}}))}}),aF=l(()=>{eY(),ta(),tY(),aV=(t,r)=>{var i,a,s,n,o,u;let l,d,p=t.inputs,c=p[0].dims,h=p[0].dataType,f=p[1].dims,m=f[f.length-1],g=e9.sizeToDimension(f,f.length-1),y=e9.sizeFromDimension(c,r.batchDims+m),_=e9.sizeToDimension(c,r.batchDims),b=e9.sizeFromDimension(c,r.batchDims),$=Array(m),w=y;for(let t=0;t<m;++t)$[m-1-t]=w,w*=c[r.batchDims+m-1-t];let v=(i=t,a=p[1],s=$,n=r.batchDims,o=c,l=[{type:12,data:u=g},{type:12,data:n},{type:12,data:o},{type:12,data:s},{type:12,data:g/_},{type:12,data:b},{type:12,data:m}],d=[u],l.push(...tN(a.dims,d)),i.compute({name:"computeSliceOffsets",shaderCache:{hint:`${o.length}_${s.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:d,dataType:i.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:t=>{let r=tj("indices_data",a.dataType,a.dims.length),i=tH("input_slice_offsets_data",12,1,1),n=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:o.length},{name:"sizes_from_slice_dims_data",type:"u32",length:s.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${t.registerUniforms(n).declareVariables(r,i)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${1===o.length?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${1===s.length?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`}},{inputs:[a],outputs:[-1]})[0]),x=r.batchDims+m;if(x>c.length)throw Error("last dimension of indices must not be larger than rank of input tensor");let S=f.slice(0,-1).concat(c.slice(x)),T=e9.size(S),E=[{type:12,data:T},{type:12,data:y},...tN(p[0].dims,v.dims,S)];t.compute({name:"GatherND",shaderCache:{hint:r.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:S,dataType:h}],dispatchGroup:{x:Math.ceil(T/64)},programUniforms:E}),getShaderSource:t=>{let r=tj("data",p[0].dataType,p[0].dims.length),i=tj("slice_offsets",12,v.dims.length),a=tH("output",p[0].dataType,S.length);return`
          ${t.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(r,i,a)}
            ${t.mainStart()}
            ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`}},{inputs:[p[0],v]})},aq=t=>({batchDims:t.batch_dims,cacheKey:""})}),aj=l(()=>{eY(),ta(),tB(),tY(),aW=(t,r)=>{var i,a;let s,n,o,u,l,d,p,c,h,f;((t,r)=>{if(t.length<3||t.length>4)throw Error("GatherBlockQuantized requires 3 or 4 inputs.");let i=e9.normalizeAxis(r.quantizeAxis,t[0].dims.length),a=r.blockSize,s=t[0],n=t[2],o=4===t.length?t[3]:void 0;if(n.dims.length!==s.dims.length||!s.dims.map((t,r)=>r===i?Math.ceil(t/a)===n.dims[r]:t===n.dims[r]).reduce((t,r)=>t&&r,!0))throw Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(o){if(o.dataType!==s.dataType)throw Error("Zero point must have the same data type as the input tensor.");if(o.dims.length!==n.dims.length||!o.dims.map((t,r)=>t===n.dims[r]).reduce((t,r)=>t&&r,!0))throw Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}})(t.inputs,r),t.compute((i=t.inputs,a=r,s=i[0].dims,n=i[1].dims,o=s.length,u=e9.normalizeAxis(a.gatherAxis,o),l=e9.normalizeAxis(a.quantizeAxis,o),(d=s.slice(0)).splice(u,1,...n),p=e9.size(d),c=i[2].dataType,h=22===i[0].dataType,f=[{type:12,data:p},{type:12,data:l},{type:12,data:u},{type:12,data:a.blockSize},...tN(...i.map((t,r)=>t.dims),d)],{name:"GatherBlockQuantized",shaderCache:{hint:`${a.cacheKey};${i.filter((t,r)=>1!==r).map(t=>t.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:i.length},(t,r)=>"rank")},getRunData:()=>({outputs:[{dims:d,dataType:c}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:f}),getShaderSource:t=>{let r=tj("data",i[0].dataType,i[0].dims.length),a=tj("inputIndices",i[1].dataType,i[1].dims.length),o=tj("scales",i[2].dataType,i[2].dims.length),l=i.length>3?tj("zeroPoint",i[3].dataType,i[3].dims.length):void 0,p=tH("output",c,d.length),f=[r,a,o];return l&&f.push(l),`
        ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...f,p)}
        ${t.mainStart()}
        let output_indices = ${p.offsetToIndices("global_idx")};
        var indices_indices = ${a.type.indices}(0);
        ${n.length>1?`
          for (var i: u32 = 0; i < ${n.length}; i++) {
            let index = ${p.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${a.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${p.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${r.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${p.indicesGet("output_indices","i")};
          ${r.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${a.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${s[u]};
        }
        ${r.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${d.length}; i++) {
          let index = ${p.indicesGet("output_indices",`i + ${n.length} - 1`)};
          ${r.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${r.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${r.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${o.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${o.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${o.getByIndices("scale_indices")};
        ${l?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${l.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${l.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${h?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${tU(c)}(quantized_data - zero_point) * scale;
        ${p.setByOffset("global_idx","dequantized_data")};
    }`}}))},aG=t=>tR({blockSize:t.blockSize,gatherAxis:t.gatherAxis,quantizeAxis:t.quantizeAxis})}),aZ=l(()=>{eY(),ta(),tB(),tY(),aH=t=>tR({axis:t.axis}),aK=(t,r)=>{var i,a;let s,n,o,u,l,d,p,c,h,f,m,g,y;(t=>{if(!t||2!==t.length)throw Error("GatherElements requires 2 inputs.");if(t[0].dims.length<1)throw Error("GatherElements requires that the data input be rank >= 1.");if(t[0].dims.length!==t[1].dims.length)throw Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)})(t.inputs),t.compute((i=t.inputs,a=r,s=i[0].dims,n=i[0].dataType,o=s.length,u=i[1].dims,l=i[1].dataType,p=s[d=e9.normalizeAxis(a.axis,o)],c=u.slice(0),h=e9.size(c),f=tj("input",n,o),m=tj("indicesInput",l,u.length),g=tH("output",n,c.length),(y=[{type:12,data:h},{type:6,data:p},{type:12,data:d}]).push(...tN(s,u,c)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:c,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(h/64)},programUniforms:y}),getShaderSource:t=>`
      ${t.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,g)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${g.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${g.setByOffset("global_idx","value")};
  }`}))}}),aY=l(()=>{eY(),ta(),tY(),aQ=t=>({transA:t.transA,transB:t.transB,alpha:t.alpha,beta:t.beta,cacheKey:`${t.transA};${t.transB};${1===t.alpha}`}),aX=(t,r)=>{(t=>{if(!t)throw Error("Input is missing");if(t.length<2||t.length>3)throw Error("Invaid input number.");if(3===t.length&&t[2].dims.length>2)throw Error("Invalid input shape of C");if(t[0].dataType!==t[1].dataType||3===t.length&&t[0].dataType!==t[2].dataType)throw Error("Input types are mismatched")})(t.inputs),t.compute(((t,r)=>{let i=t[0].dims.slice(),a=t[1].dims.slice(),[s,n,o]=tt.getShapeOfGemmResult(i,r.transA,a,r.transB,3===t.length?t[2].dims:void 0),u=[s,n],l=Math.ceil(n/16),d=Math.ceil(s/16),p=(e9.size(u),[{type:12,data:l},{type:12,data:s},{type:12,data:n},{type:12,data:o},{type:1,data:r.alpha},{type:1,data:r.beta}]),c=["type","type"];return 3===t.length&&(p.push(...tN(t[2].dims)),c.push("rank")),p.push(...tN(u)),{name:"GemmShared",shaderCache:{hint:`${r.cacheKey}`,inputDependencies:c},getRunData:()=>({outputs:[{dims:u,dataType:t[0].dataType}],dispatchGroup:{x:l*d},programUniforms:p}),getShaderSource:i=>{let a=tj("a",t[0].dataType,t[0].dims),s=tj("b",t[1].dataType,t[1].dims),n=null,o=[a,s];3===t.length&&(n=tj("c",t[2].dataType,t[2].dims.length),o.push(n));let l=tH("output",t[0].dataType,u.length);o.push(l);let d="",p="";r.transA&&r.transB?(p=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${a.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${s.type.value}(0);
      }
      `,d="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):r.transA&&!r.transB?(p=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${a.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${s.type.value}(0);
      }
      `,d="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!r.transA&&r.transB?(p=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${a.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${s.type.value}(0);
      }
      `,d="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):r.transA||r.transB||(p=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${a.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${s.type.value}(0);
      }
      `,d="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let c=1===r.alpha?"":"value *= uniforms.alpha;";return`
  ${i.registerUniforms([{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}]).declareVariables(...o)}
  var<workgroup> tile_a: array<array<${a.type.storage}, 16>, 16>;
  var<workgroup> tile_b: array<array<${s.type.storage}, 16>, 16>;
  ${i.mainStart([16,16,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * 16;
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * 16;
    let num_tiles = (uniforms.K - 1) / 16 + 1;
    var k_start = 0u;
    var value = ${l.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${p}
      k_start = k_start + 16;
      workgroupBarrier();

      for (var k: u32 = 0u; k < 16; k++) {
        ${d}
      }
      workgroupBarrier();
    }

    ${c}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${null!=n?`let cOffset = ${n.broadcastedIndicesToOffset("vec2(m, n)",l)}; value += ${l.type.value}(uniforms.beta) * ${n.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`}}})(t.inputs,r))}}),a8=l(()=>{eY(),ta(),tB(),tY(),[aJ,a0,a1,a2]=[0,1,2,3],a3=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,a4=(t,r)=>{var i,a;let s,n,o,u,l,d,p;(t=>{if(4!==t[0].dims.length)throw Error("only 4-D tensor is supported.");if(t[0].dims.length!==t[1].dims.length)throw Error("input dimensions must be equal to grid dimensions");if(t[0].dims.length-2!==t[1].dims[t[1].dims.length-1])throw Error(`last dimension of grid must be equal to ${t[0].dims.length-2}`);if(t[0].dims[0]!==t[1].dims[0])throw Error("grid batch size must match input batch size")})(t.inputs),t.compute((i=t.inputs,a=r,s=tj("x",i[0].dataType,i[0].dims.length),n=[i[1].dims[0],i[1].dims[1],i[1].dims[2]],o=tj("grid",i[1].dataType,n.length,2),u=[i[0].dims[0],i[0].dims[1],i[1].dims[1],i[1].dims[2]],"NHWC"===a.format&&(u=[i[0].dims[0],i[1].dims[1],i[1].dims[2],i[0].dims[3]],[aJ,a0,a1,a2]=[0,3,1,2]),l=tH("output",i[0].dataType,u.length),d=s.type.value,p=[{type:12,data:e9.size(u)},...tN(i[0].dims,n,u)],{name:"GridSample",shaderCache:{hint:`${a.cacheKey}`,inputDependencies:["type","type"]},getRunData:t=>{let r=e9.size(u);return{outputs:[{dims:u,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:p}},getShaderSource:t=>{let r,i,n,u,p,c,h,f,m;return`
  ${t.registerUniform("output_size","u32").declareVariables(s,o,l)}
  ${a3}
  ${r=d,`
  fn gs_bicubic_interpolate(p: mat4x4<${r}>, x: f32, y: f32) -> ${r} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${r}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`}
  ${i=a,`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${0===i.alignCorners?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`}
  ${n=a,`
  ${"reflection"===n.paddingMode?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`}
  ${u=s,p=d,c=a,`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${p} {
     var pixel = ${p}(0);
     var indices = vec4<u32>(0);
     indices[${aJ}] = batch;
     indices[${a0}] = channel;`+(()=>{switch(c.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${a1}] = u32(r);
            indices[${a2}] = u32(c);
          } else {
            return ${p}(0);
          }
        `;case"border":return`
          indices[${a1}] = u32(clamp(r, 0, H - 1));
          indices[${a2}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${a1}] = gs_reflect(r, border[1], border[3]);
          indices[${a2}] = gs_reflect(c, border[0], border[2]);
        `;default:throw Error(`padding mode ${c.paddingMode} is not supported`)}})()+`
    return ${u.getByIndices("indices")};
  }
`}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${a1}]);
      let W_in = i32(uniforms.x_shape[${a2}]);

      ${0===a.alignCorners?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${l.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${aJ}], indices[${a1}], indices[${a2}]);
      let nxy = ${o.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${h=l,f=d,m=a,(()=>{switch(m.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${aJ}], indices[${a0}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${aJ}], indices[${a0}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${aJ}], indices[${a0}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${aJ}], indices[${a0}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${aJ}], indices[${a0}], border);

          let dx2 = ${f}(f32(x2) - x);
          let dx1 = ${f}(x - f32(x1));
          let dy2 = ${f}(f32(y2) - y);
          let dy1 = ${f}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${f}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${aJ}], indices[${a0}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw Error(`mode ${m.mode} is not supported`)}})()+`${h.setByOffset("global_idx","result")}`}
  }`}}))},a6=t=>tR({alignCorners:t.align_corners,mode:t.mode,paddingMode:t.padding_mode,format:t.format})}),sr=l(()=>{eY(),ta(),tB(),tv(),rM(),tY(),t3(),a5=(t,r)=>t.length>r&&t[r].dims.length>0?t[r]:void 0,a7=t=>tR({...t}),a9=tR({perm:[0,2,1,3]}),se=(t,r,i,a,s,n,o,u)=>{var l,d,p,c,h,f,m;let g,y,_,b=n;if(!(o&&e9.size(o.dims)>0))return 3===n.dims.length&&(b=n.reshape([r,a,i,s])),1===i||1===a?b:t.compute(t0(b,a9.perm),{inputs:[b],outputs:[-1]})[0];if(1===a)throw Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return b=(l=t,d=n,p=o,c=r,h=a,f=i*s,m=u,g=[c,h,f],_=[{type:12,data:y=e9.size(g)},{type:12,data:m},{type:12,data:f}],b=l.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:g,dataType:d.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:_}),getShaderSource:t=>{let r=tH("qkv_with_bias",d.dataType,g),i=tj("qkv",d.dataType,g),a=tj("bias",p.dataType,g);return`
  ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}]).declareVariables(i,a,r)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`}},{inputs:[d,p],outputs:[-1]})[0]).reshape([r,a,i,s]),1===i||1===a?b:t.compute(t0(b,a9.perm),{inputs:[b],outputs:[-1]})[0]},st=(t,r)=>{let i=((t,r)=>{let i,a=t[0],s=a5(t,1),n=a5(t,2),o=a5(t,3),u=a5(t,4),l=a5(t,5),d=a5(t,6),p=a5(t,7);if(3!==a.dims.length&&5!==a.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let c=a.dims[0],h=a.dims[1],f=3===a.dims.length?a.dims[2]:r.numHeads*a.dims[4],m=h,g=0,y=0,_=Math.floor(f/r.numHeads);if(d&&p&&e9.size(d.dims)&&e9.size(p.dims)){if(4!==d.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(d.dims[0]!==c||d.dims[1]!==r.numHeads||d.dims[3]!==_)throw Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==c||p.dims[1]!==r.numHeads||p.dims[3]!==_)throw Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[2]!==p.dims[2])throw Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(4!==p.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');g=d.dims[2],y=d.dims[2]}else if(d&&e9.size(d.dims)||p&&e9.size(p.dims))throw Error('Input "past_key" and "past_value" shall be both present or both absent');if(s&&e9.size(s.dims)>0){if(3!==a.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(s.dims.length<3||s.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(a.dims[0]!==s.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===s.dims.length){if(s.dims[2]!==a.dims[2])throw Error('Input "query" and "key" shall have same dim 2 (hidden_size)');i=2,m=s.dims[1]}else if(5===s.dims.length){if(s.dims[2]!==r.numHeads||2!==s.dims[3]||s.dims[4]!==_)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(n)throw Error('Expect "value" be none when "key" has packed kv format.');i=5,m=s.dims[1]}else{if(s.dims[1]!==r.numHeads||s.dims[3]!==_)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');i=0,m=s.dims[2]}}else{if(5!==a.dims.length)throw Error('Input "query" is expected to have 5 dimensions when key is empty');if(a.dims[2]!==r.numHeads||3!==a.dims[3])throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');i=3}if(o&&e9.size(o.dims)>0){if(1!==o.dims.length)throw Error('Input "bias" is expected to have 1 dimension');if(s&&5===s.dims.length&&2===s.dims[3])throw Error("bias is not allowed for packed kv.")}let b=g+m,$=0;if(u&&e9.size(u.dims)>0){$=8;let t=u.dims;throw 1===t.length?t[0]===c?$=1:t[0]===3*c+2&&($=3):2===t.length&&t[0]===c&&t[1]===b&&($=5),8===$?Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):Error("Mask not supported")}let w=!1,v=f;if(n&&e9.size(n.dims)>0){if(3!==n.dims.length&&4!==n.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(a.dims[0]!==n.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===n.dims.length){if(m!==n.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');v=n.dims[2]}else{if(m!==n.dims[2])throw Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');v=n.dims[1]*n.dims[3],w=!0}}if(u&&e9.size(u.dims)>0)throw Error("Key padding mask is not supported");if(l&&e9.size(l.dims)>0){if(4!==l.dims.length)throw Error('Input "attention_bias" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==r.numHeads||l.dims[2]!==h||l.dims[3]!==b)throw Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:h,pastSequenceLength:g,kvSequenceLength:m,totalSequenceLength:b,maxSequenceLength:y,inputHiddenSize:0,hiddenSize:f,vHiddenSize:v,headSize:_,vHeadSize:Math.floor(v/r.numHeads),numHeads:r.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:r.maskFilterValue,maskType:$,scale:r.scale,broadcastResPosBias:!1,passPastInKv:w,qkvFormat:i}})(t.inputs,r),a=t.inputs[0],s=a5(t.inputs,1),n=a5(t.inputs,2),o=a5(t.inputs,3),u=a5(t.inputs,4),l=a5(t.inputs,5),d=a5(t.inputs,6),p=a5(t.inputs,7);if(5===a.dims.length)throw Error("Packed QKV is not implemented");if(s?.dims.length===5)throw Error("Packed KV is not implemented");let c=s&&n&&4===s.dims.length&&4===n.dims.length,h=se(t,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,a,o,0);if(c)return rR(t,h,s,n,u,void 0,d,p,l,i);if(!s||!n)throw Error("key and value must be provided");let f=se(t,i.batchSize,i.numHeads,i.kvSequenceLength,i.headSize,s,o,i.hiddenSize),m=se(t,i.batchSize,i.numHeads,i.kvSequenceLength,i.vHeadSize,n,o,2*i.hiddenSize);rR(t,h,f,m,u,void 0,d,p,l,i)}}),sn=l(()=>{eY(),ta(),tB(),tY(),si=(t,r)=>{let i=t[0].dims,a=e9.size(i),s=t[0].dataType,n=e9.normalizeAxis(r.axis,i.length),o=Array(r.numOutputs),u=tj("input",s,i.length),l=Array(r.numOutputs),d=[],p=[],c=0,h=[{type:12,data:a}];for(let a=0;a<r.numOutputs;a++){c+=r.splitSizes[a],l[a]=c;let u=i.slice();u[n]=r.splitSizes[a],p.push(u),o[a]=tH(`output${a}`,s,u.length),d.push({dims:p[a],dataType:t[0].dataType})}return h.push({type:12,data:l},...tN(i,...p)),{name:"Split",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getShaderSource:t=>{let r;return`
  ${t.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...o)}
  ${r=l.length,`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${r}u; i += 1u ) {
    if (index < ${tW("uniforms.size_in_split_axis","i",r)}) {
        return i;
    }
    }
    return ${r}u;
}`}
  ${(t=>{let r=t.length,i=[];for(let a=0;a<r;++a){let s=t[a].setByIndices("indices","input[global_idx]");1===r?i.push(s):0===a?i.push(`if (output_number == ${a}u) { ${s} }`):a===r-1?i.push(`else { ${s} }`):i.push(`else if (output_number == ${a}) { ${s} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${t[0].type.indices}, global_idx: u32) {
        ${i.join(`
`)}
      }`})(o)}

  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${tW("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`},getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(a/64)},programUniforms:h})}},sa=(t,r)=>{let i,a;var s,n,o=t.inputs;if(!o||o.length<1)throw Error("too few inputs");let u=1===t.inputs.length?r:(s=t.inputs,i=[],a=(n=r).numOutputs,s[1].dims[0]>0&&(s[1].getBigInt64Array().forEach(t=>i.push(Number(t))),a=i.length),tR({numOutputs:a,axis:n.axis,splitSizes:i}));t.compute(si(t.inputs,u),{inputs:[0]})},ss=t=>{let r=t.axis,i=t.splitSizes,a=t.numOutputs<0?i.length:t.numOutputs;if(a!==i.length)throw Error("numOutputs and splitSizes length must be equal");return tR({axis:r,numOutputs:a,splitSizes:i})}}),sl=l(()=>{eY(),ta(),tB(),tY(),so=(t,r)=>{let{interleaved:i,numHeads:a,rotaryEmbeddingDim:s,scale:n}=r,o=t[0].dims[0],u=e9.sizeFromDimension(t[0].dims,1),l=t[0].dims[t[0].dims.length-2],d=u/l,p=t[2].dims[1],c=0===s?2*p:d/a,h=[o,l,d/c,c-p],f=e9.computeStrides(h),m=[{type:1,data:n},{type:12,data:h},{type:12,data:f},...3===t[0].dims.length?Array({type:12,data:[u,d,c,1]}):[],...4===t[0].dims.length?Array({type:12,data:[u,c,l*c,1]}):[],...tN(t[0].dims,t[1].dims,t[2].dims,t[3].dims,t[0].dims)];return{name:"RotaryEmbedding",shaderCache:{hint:tR({interleaved:i}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:r=>{let a=tj("input",t[0].dataType,t[0].dims.length),s=tj("position_ids",t[1].dataType,t[1].dims.length),n=tj("cos_cache",t[2].dataType,t[2].dims.length),o=tj("sin_cache",t[3].dataType,t[3].dims.length),u=tH("output",t[0].dataType,t[0].dims.length);return r.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:h.length},{name:"global_strides",type:"u32",length:f.length},{name:"input_output_strides",type:"u32",length:f.length}]),`
        ${r.declareVariables(a,s,n,o,u)}

        ${r.mainStart(tM)}
          let half_rotary_emb_dim = uniforms.${n.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${r.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${s.broadcastedIndicesToOffset("bsnh.xy",tH("",s.type.tensor,2))};
            let position_id =
                u32(${s.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${i});
            let j = i + select(half_rotary_emb_dim, 1, ${i});
            let re = ${a.getByOffset("i")} * ${n.get("position_id","bsnh[3]")} -
                ${a.getByOffset("j")} * ${o.get("position_id","bsnh[3]")};
            ${u.setByOffset("i","re")}
            let im = ${a.getByOffset("i")} * ${o.get("position_id","bsnh[3]")} +
                ${a.getByOffset("j")} * ${n.get("position_id","bsnh[3]")};
            ${u.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${u.setByOffset("k",a.getByOffset("k"))}
          }
        }`},getRunData:()=>({outputs:[{dims:t[0].dims,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(e9.size(h)/tM)},programUniforms:m})}},su=(t,r)=>{((t,r)=>{let[i,a,s,n]=t,{numHeads:o,rotaryEmbeddingDim:u}=r;if(3!==i.dims.length&&4!==i.dims.length)throw Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${i.dims.length}`);if(!e9.areEqual(a.dims,[])&&!e9.areEqual(a.dims,[1])&&2!==a.dims.length)throw Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${a.dims.length}`);if(2!==s.dims.length)throw Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${s.dims.length}`);if(2!==n.dims.length)throw Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!e9.areEqual(s.dims,n.dims))throw Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&0===o)throw Error("num_heads must be provided if rotary_embedding_dim is specified");let l=i.dims[0],d=i.dims[i.dims.length-2],p=s.dims[0],c=e9.sizeFromDimension(i.dims,1)/d,h=0===u?2*s.dims[1]:c/o;if(u>h)throw Error("rotary_embedding_dim must be less than or equal to head_size");if(2===a.dims.length){if(l!==a.dims[0])throw Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${a.dims[0]}`);if(d!==a.dims[1])throw Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${a.dims[1]}`)}if(d>p)throw Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported");if(h/2!==s.dims[1]&&u/2!==s.dims[1])throw Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${s.dims[1]}`)})(t.inputs,r),t.compute(so(t.inputs,r))}}),sh=l(()=>{tB(),eY(),rM(),sr(),sn(),t3(),sl(),tY(),sd=tR({perm:[0,2,1,3]}),sp=(t,r,i)=>{let a=r,s=i.kvNumHeads;return 3===r.dims.length&&0!==i.kvSequenceLength&&(a=r.reshape([i.batchSize,i.kvSequenceLength,s,i.headSize]),a=t.compute(t0(a,sd.perm),{inputs:[a],outputs:[-1]})[0]),a},sc=(t,r)=>{let i=((t,r)=>{if(r.doRotary&&t.length<=7)throw Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let i=t[0],a=t[1],s=t[2],n=t[3],o=t[4];if(0!==r.doRotary&&t.length<=7)throw Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(-1!==r.localWindowSize)throw Error("Local attention is not supported");if(0!==r.softcap)throw Error("Softcap is not supported");if(0!==r.rotaryInterleaved)throw Error("Rotary interleaved is not supported");if(r.smoothSoftmax)throw Error("Smooth softmax is not supported");if(3!==i.dims.length&&5!==i.dims.length)throw Error("Input query is expected to have 3 or 5 dimensions");let u=i.dims[0],l=i.dims[1],d=3===i.dims.length?i.dims[2]:r.numHeads*i.dims[4],p=l,c=0,h=!a||0===a.dims.length,f=Math.floor(h?d/(r.numHeads+2*r.kvNumHeads):d/r.numHeads);h&&(d=f*r.numHeads);let m=n&&0!==n.dims.length,g=o&&0!==o.dims.length;if(m&&4===n.dims.length&&n.dims[0]===u&&n.dims[1]!==r.kvNumHeads&&n.dims[2]===r.kvNumHeads&&n.dims[3]===f)throw Error("BSNH pastKey/pastValue is not supported");if(m&&g){if(4!==n.dims.length)throw Error('Input "past_key" is expected to have 4 dimensions');if(4!==o.dims.length)throw Error('Input "past_value" is expected to have 4 dimensions');c=n.dims[2]}else if(m||g)throw Error('Input "past_key" and "past_value" shall be both present or both absent');let y=1;if(a&&a.dims.length>0){if(3!==i.dims.length)throw Error('Input "query" is expected to have 3 dimensions when key is given');if(a.dims.length<3||a.dims.length>5)throw Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==a.dims[0])throw Error('Input "query" and "key" shall have same dim 0 (batch size)');if(3===a.dims.length){if(i.dims[2]%a.dims[2]!=0)throw Error('Dimension 2 of "query" should be a multiple of "key"');p=a.dims[1]}else if(5===a.dims.length){if(a.dims[2]!==r.numHeads||2!==a.dims[3]||a.dims[4]!==f)throw Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(s)throw Error('Expect "value" be none when "key" has packed kv format.');p=a.dims[1]}else{if(a.dims[1]!==r.numHeads||a.dims[3]!==f)throw Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');p=a.dims[2]}}else{if(3!==i.dims.length&&5!==i.dims.length)throw Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(5===i.dims.length&&(i.dims[2]!==r.numHeads||3!==i.dims[3]))throw Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');y=3}let _=!1,b=r.kvNumHeads?f*r.kvNumHeads:d;if(s&&s.dims.length>0){if(3!==s.dims.length&&4!==s.dims.length)throw Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==s.dims[0])throw Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(3===s.dims.length){if(p!==s.dims[1])throw Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');b=s.dims[2]}else{if(p!==s.dims[2])throw Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');b=s.dims[1]*s.dims[3],_=!0}}let $=t.length>4?t[5]:void 0;if($){if(0===$.dims.length)throw Error("seqlens_k must be at least 1D, got scalar.");let t=$.dims.reduce((t,r)=>t*r,1);if(t!==u)throw Error(`seqlens_k must have batch_size (${u}) elements, got ${t}.`);for(let t=0;t<$.dims.length;t++)if(1!==$.dims[t]&&$.dims[t]!==u)throw Error(`seqlens_k has unexpected shape. Each dimension must be 1 or batch_size (${u}), got dims[${t}] = ${$.dims[t]}.`)}return{batchSize:u,sequenceLength:l,pastSequenceLength:c,kvSequenceLength:p,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:d,vHiddenSize:b,headSize:f,vHeadSize:Math.floor(b/r.kvNumHeads),numHeads:r.numHeads,kvNumHeads:r.kvNumHeads,nReps:r.numHeads/r.kvNumHeads,pastPresentShareBuffer:!1,maskType:0,scale:r.scale,broadcastResPosBias:!1,passPastInKv:_,qkvFormat:y}})(t.inputs,r);if(5===t.inputs[0].dims.length)throw Error("Packed QKV is not implemented");if(t.inputs[1]?.dims.length===5)throw Error("Packed KV is not implemented");let a=t.inputs[0],s=t.inputs[1]&&t.inputs[1].dims.length>0?t.inputs[1]:void 0,n=t.inputs[2]&&t.inputs[2].dims.length>0?t.inputs[2]:void 0,o=t.inputs[3]&&0!==t.inputs[3].dims.length?t.inputs[3]:void 0,u=t.inputs[4]&&0!==t.inputs[4].dims.length?t.inputs[4]:void 0,l=t.inputs.length>4?t.inputs[5]:void 0,d=t.inputs.length>5?t.inputs[6]:void 0,p=i.kvNumHeads?i.kvNumHeads:i.numHeads,c=tR({axis:2,numOutputs:3,splitSizes:[i.numHeads*i.headSize,p*i.headSize,p*i.headSize]}),[h,f,m]=s||n?[a,s,n]:t.compute(si([a],c),{inputs:[a],outputs:[-1,-1,-1]}),g,y;if(r.doRotary){var _,b,$,w;let a,s,n,o=t.compute((_=i.batchSize,b=i.sequenceLength,$=l,w=d,a=[_*b],n=[{type:12,data:s=_*b},{type:12,data:b},{type:12,data:_}],{name:"GeneratePositionIds",shaderCache:{hint:`${_};${b}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:7}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:n}),getShaderSource:t=>{let r=tj("seq_lens",$.dataType,$.dims),i=tj("total_seq_lens",w.dataType,w.dims),s=tH("pos_ids",7,a);return`
  ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}]).declareVariables(r,i,s)}
  ${t.mainStart()}
    ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${i.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${r.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${s.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${s.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${s.setByOffset("global_idx","seqlen")}
    };
  }
  `}}),{inputs:[l,d],outputs:[-1]})[0],u=t.inputs[7],p=t.inputs[8],c=tR({interleaved:0!==r.rotaryInterleaved,numHeads:i.numHeads,rotaryEmbeddingDim:0,scale:r.scale}),m=[h,o,u,p],v=[-1];g=t.compute(so(m,c),{inputs:m,outputs:v})[0],m.splice(0,1,f);let x=tR({interleaved:0!==r.rotaryInterleaved,numHeads:i.kvNumHeads,rotaryEmbeddingDim:0,scale:r.scale});y=t.compute(so(m,x),{inputs:m,outputs:v})[0]}let v=se(t,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,r.doRotary?g:h,void 0,0),x=sp(t,r.doRotary?y:f,i),S=sp(t,m,i);rR(t,v,x,S,void 0,void 0,o,u,void 0,i,l,d)}}),sg=l(()=>{eY(),ta(),t3(),tY(),sf=(t,r,i,a,s,n,o,u)=>{let l=tL(n),d=1===l?"f32":`vec${l}f`,p=1===l?"vec2f":`mat2x${l}f`,c=s*o,h=64;1===c&&(h=256);let f=[s,o,n/l],m=[s,o,2],g=[];return g.push(...tN(f,m)),t.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${h}`,inputDependencies:["rank","type","type"]},getRunData:()=>({outputs:[{dims:m,dataType:1}],dispatchGroup:{x:c},programUniforms:g}),getShaderSource:t=>{let s=tj("x",r.dataType,3,l),n=[s,tj("scale",i.dataType,i.dims),tj("bias",a.dataType,a.dims),tH("output",1,3,2)];return`
  var<workgroup> workgroup_shared : array<${p}, ${h}>;
  const workgroup_size = ${h}u;
  ${t.declareVariables(...n)}
  ${t.mainStart(h)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${s.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${p}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${tF("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${tF("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`}},{inputs:[r,i,a],outputs:[-1]})[0]},sm=(t,r)=>{var i,a,s;let n,o,u,l,d,p,c,h,f;"NHWC"===r.format?((t,r,i)=>{let a=r[0].dims,s=a[0],n=a[a.length-1],o=e9.sizeFromDimension(a,1)/n,u=tL(n),l=e9.size(a)/u,d=[{type:12,data:o},{type:12,data:Math.floor(n/u)}],p=!1,c=[0,a.length-1];for(let t=0;t<a.length-2;t++)p=p||1!==a[t+1],c.push(t+1);let h=(p=p&&1!==a[a.length-1])?t.compute(t0(t.inputs[0],c),{inputs:[t.inputs[0]],outputs:[-1]})[0]:t.inputs[0].reshape(Array.from({length:a.length},(t,r)=>a[c[r]])),f=sf(t,h,r[1],r[2],s,o,n,i.epsilon);t.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${u}`,inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:a,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:t=>{let i=tP(r[0].dataType),s=1===u?"vec2f":`mat${u}x2f`,n=t=>{let r=0===t?"x":"y",a=1===u?"f32":`vec${u}f`;switch(u){case 1:return`${i}(${a}(scale.${r}))`;case 2:return`vec2<${i}>(${a}(scale[0].${r}, scale[1].${r}))`;case 4:return`vec4<${i}>(${a}(scale[0].${r}, scale[1].${r}, scale[2].${r}, scale[3].${r}))`;default:throw Error(`Not supported compoents ${u}`)}},o=tj("input",r[0].dataType,r[0].dims,u),l=tH("output",r[0].dataType,a,u);return`
  @group(0) @binding(0) var<storage, read> input : array<${o.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${s}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${l.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${t.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${n(0)}, ${n(1)});
  }`}},{inputs:[r[0],f]})})(t,t.inputs,r):(i=t,a=t.inputs,s=r,o=(n=a[0].dims)[0],u=n[1],l=e9.sizeFromDimension(n,2),d=tL(l),p=e9.size(n)/d,c=sf(i,a[0],a[1],a[2],o,l,u,s.epsilon),h=[o,u,l/d],f=[o,u],i.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:["type","none"]},getRunData:()=>({outputs:[{dims:n,dataType:a[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:[{type:12,data:p},...tN(h,f,h)]}),getShaderSource:t=>{let r=tj("x",a[0].dataType,h.length,d),i=tj("scale_shift",1,f.length,2),s=tH("output",a[0].dataType,h.length,d),n=[r,i,s];return`
  ${t.registerUniform("output_size","u32").declareVariables(...n)}
  ${t.mainStart()}
  ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${s.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${i.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${r.getByOffset("global_idx")} * ${s.type.value}(scale_shift.x) + ${s.type.value}(scale_shift.y);
      ${s.setByOffset("global_idx","value")};
  }`}},{inputs:[a[0],c]}))}}),s_=l(()=>{eY(),ta(),tY(),sy=(t,r)=>{(t=>{if(!t||t.length<2)throw Error("layerNorm requires at least 2 inputs.")})(t.inputs),t.compute(((t,r,i)=>{let a=r.simplified,s=t[0].dims,n=t[1],o=!a&&t[2],u=e9.normalizeAxis(r.axis,s.length),l=e9.sizeToDimension(s,u),d=e9.sizeFromDimension(s,u),p=e9.size(n.dims),c=o?e9.size(o.dims):0;if(p!==d||o&&c!==d)throw Error(`Size of X.shape()[axis:] == ${d}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${p} and bias size of ${c}`);let h=[];for(let t=0;t<s.length;++t)t<u?h.push(s[t]):h.push(1);let f=tL(d),m=["type","type"],g=[{type:12,data:l},{type:1,data:d},{type:12,data:Math.floor(d/f)},{type:1,data:r.epsilon}];o&&m.push("type");let y=i>1,_=i>2,b=[{dims:s,dataType:t[0].dataType}];return y&&b.push({dims:h,dataType:1}),_&&b.push({dims:h,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${f};${i};${a}`,inputDependencies:m},getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(l/64)},programUniforms:g}),getShaderSource:r=>{let i=tP(t[0].dataType),u=[tj("x",t[0].dataType,t[0].dims,f),tj("scale",n.dataType,n.dims,f)];return o&&u.push(tj("bias",o.dataType,o.dims,f)),u.push(tH("output",t[0].dataType,s,f)),y&&u.push(tH("mean_data_output",1,h)),_&&u.push(tH("inv_std_output",1,h)),`
  ${r.registerUniforms([{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...u)}
  ${r.mainStart()}
    ${r.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${tV("f32",f)};
    var mean_square_vector = ${tV("f32",f)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${tq(i,f,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${tF("mean_vector",f)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${tF("mean_square_vector",f)} / uniforms.norm_size ${a?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${tq(i,f,"x[j + offset]")};
      let f32scale = ${tq(i,f,"scale[j]")};
      output[j + offset] = ${u[0].type.value}((f32input ${a?"":"- mean"}) * inv_std_dev * f32scale
        ${o?`+ ${tq(i,f,"bias[j]")}`:""}
      );
    }

    ${y?"mean_data_output[global_idx] = mean":""};
    ${_?"inv_std_output[global_idx] = inv_std_dev":""};
  }`}}})(t.inputs,r,t.outputCount))}}),s$=l(()=>{ta(),iQ(),i1(),sb=t=>{var r=t.inputs;if(!r||2!==r.length)throw Error("MatMul requires 2 inputs.");if(r[0].dims[r[0].dims.length-1]!==r[1].dims[r[1].dims.length-2])throw Error("shared dimension does not match.");let i=e7.calcShape(t.inputs[0].dims,t.inputs[1].dims,!0);if(!i)throw Error("Can't use matmul on the given tensors");let a=i[i.length-1],s=t.inputs[0].dims[t.inputs[0].dims.length-1];if(a<8&&s<8)t.compute(iZ(t.inputs,{activation:""},i));else{let r=i[i.length-2],n=e9.size(t.inputs[0].dims.slice(0,-2)),o=e9.size(t.inputs[1].dims.slice(0,-2));if(1!==n&&1===r&&1===o){let r=t.inputs[0].reshape([1,n,s]),o=t.inputs[1].reshape([1,s,a]),u=[1,n,a],l=[r,o];t.compute(i0(l,{activation:""},i,u),{inputs:l})}else t.compute(i0(t.inputs,{activation:""},i))}}}),sx=l(()=>{eY(),ta(),tB(),tY(),sw=(t,r)=>{var i,a,s,n;let o,u,l,d,p,c,h,f,m,g,y,_,b,$,w,v,x,S,T,E,k,I,C,z,A,O,R,B,M,D,P,U,N,L,V,q,F,W,G,j,H,K;((t,r)=>{if(t.length<3||t.length>4)throw Error("MatMulNBits requires 3 or 4 inputs");let i=t[0],a=i.dims.length;if(i.dims[a-1]!==r.k)throw Error("The last dim of input shape does not match the k value");let s=Math.floor((r.k+r.blockSize-1)/r.blockSize),n=r.blockSize/8*r.bits,o=t[1];if(!e9.areEqual(o.dims,[r.n,s,n]))throw Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=t[2].dims;if(e9.size(u)!==r.n*s)throw Error("scales input size error.");if(4===t.length){let i=t[3].dims,a=r.n*(8===r.bits?s:Math.floor((s*r.bits+7)/8));if(e9.size(i)!==a)throw Error("zeroPoints input size error.")}})(t.inputs,r),32===r.blockSize&&t.adapterInfo.isVendor("intel")&&t.adapterInfo.isArchitecture("gen-12lp")?t.compute((i=t.inputs,a=r,u=(o=i[0].dims).length,l=o[u-2],d=a.k,p=a.n,c=o.slice(0,u-2),h=e9.size(c),f=i[1].dims[2]/4,m=i[0].dataType,g=tL(a.k),y=tL(f),_=c.concat([l,p]),$=128/(b=p%8==0?8:p%4==0?4:1),x=(v=$*y*(w=Math.floor(32/a.bits)))/g,S=v/a.blockSize,T=e9.size(_)/b,E=[],k=[h,l,d/g],(I=e9.convertShape(i[1].dims).slice()).splice(-1,1,f/y),E.push(...tN(k)),E.push(...tN(I)),E.push(...tN(i[2].dims)),4===i.length&&E.push(...tN(e9.convertShape(i[3].dims))),C=[h,l,p],E.push(...tN(C)),{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${a.blockSize};${g};${y};${$};${b}`,inputDependencies:Array(i.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:m}],dispatchGroup:{x:T},programUniforms:E}),getShaderSource:t=>{let r=k.length,s=tj("a",i[0].dataType,r,g),n=tj("b",12,I.length,y),o=tj("scales",i[2].dataType,i[2].dims.length),u=[s,n,o],l=4===i.length?tj("zero_points",12,i[3].dims.length):void 0;l&&u.push(l);let d=C.length,p=tH("output",i[0].dataType,d),c=tP(i[0].dataType),h=()=>{switch(g){case 1:return`
          let a_data0 = vec4<${c}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${c}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${c}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${c}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw Error(`${g}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${s.type.value}, ${x}>;
        var<workgroup> inter_results: array<array<${p.type.value}, ${$}>, ${b}>;
        ${t.declareVariables(...u,p)}
        ${t.mainStart([$,b,1])}
          let output_indices = ${p.offsetToIndices(`workgroup_index * ${b}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${S} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${x};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${x}; a_offset += 128)
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${s.getByIndices(`${s.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${s.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${S} + local_id.x;
            ${l?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/a.bits)}u;
            let zero_point_bytes_per_col = (n_blocks_per_col + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${a.bits}u);
            let zero_point_word = ${l.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${c}((zero_point_word) & ${2===a.bits?"0x3u":"0xFu"});`:`
            // The default zero point is ${Math.pow(2,a.bits-1)} for unsigned ${a.bits}-bit quantization.
            let zero_point = ${c}(${Math.pow(2,a.bits-1).toFixed(1)});`}
            let scale = ${o.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${n.getByIndices(`${n.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${a.blockSize/g};
            for (var i: u32 = 0; i < ${y}; i++) {
              let b_value = ${1===y?"b_data":"b_data[i]"};
              ${(()=>{let t=Math.floor(w/8),r="";for(let i=0;i<t;i++){let t=i*a.bits*4,s=t+a.bits;r+=`
              ${h()}
              {${2===a.bits?`
                let half_word = b_value >> ${16*i}u;
                let byte_lo = half_word & 0xFFu;
                let byte_hi = (half_word >> 8u) & 0xFFu;
                let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
                let b_value_lower = unpack4xU8(spread_word & 0x03030303u);
                let b_value_upper = unpack4xU8((spread_word >> 2u) & 0x03030303u);`:`
                let b_value_lower = unpack4xU8((b_value >> ${t}u) & 0x0F0F0F0Fu);
                let b_value_upper = unpack4xU8((b_value >> ${s}u) & 0x0F0F0F0Fu);`}
                let b_quantized_values = mat2x4<${c}>(${Array.from({length:4},(t,r)=>`${c}(b_value_lower[${r}]), ${c}(b_value_upper[${r}])`).join(", ")});
                let b_dequantized_values = (b_quantized_values - mat2x4<${c}>(${Array(8).fill("zero_point").join(",")})) * scale;
                inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(t,r)=>`dot(a_data${r}, b_dequantized_values[${r}])`).join(" + ")};
              }
              word_offset += ${8/g};`}return r})()}
            }
            workgroupBarrier();
          }

          if (local_idx < ${b}) {
            var output_value: ${p.type.value} = ${p.type.value}(0);
            for (var b = 0u; b < ${$}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${p.setByIndices(`${p.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`}})):t.compute((s=t.inputs,n=r,A=(z=s[0].dims).length,O=z[A-2],R=n.k,B=n.n,M=z.slice(0,A-2),D=e9.size(M),P=s[1].dims[2]/4,U=s[0].dataType,N=tL(n.k),L=tL(P),V=tL(B),q=M.concat([O,B]),F=O>1&&B/V%2==0?2:1,W=e9.size(q)/V/F,G=[],j=[D,O,R/N],(H=e9.convertShape(s[1].dims).slice()).splice(-1,1,P/L),G.push(...tN(j)),G.push(...tN(H)),G.push(...tN(s[2].dims)),4===s.length&&G.push(...tN(e9.convertShape(s[3].dims))),K=[D,O,B/V],G.push(...tN(K)),{name:"MatMulNBits",shaderCache:{hint:`${n.blockSize};${n.bits};${N};${L};${V};${F};64`,inputDependencies:Array(s.length).fill("rank")},getRunData:()=>({outputs:[{dims:q,dataType:U}],dispatchGroup:{x:W},programUniforms:G}),getShaderSource:t=>{let r=j.length,i=tj("a",s[0].dataType,r,N),a=tj("b",12,H.length,L),o=tj("scales",s[2].dataType,s[2].dims.length),u=[i,a,o],l=4===s.length?tj("zero_points",12,s[3].dims.length):void 0;l&&u.push(l);let d=K.length,p=tH("output",s[0].dataType,d,V),c=tP(s[0].dataType),h=(()=>{switch(N){case 1:return`array<${c}, 8>`;case 2:return`mat4x2<${c}>`;case 4:return`mat2x4<${c}>`;default:throw Error(`${N}-component is not supported.`)}})(),f=Math.floor(32/n.bits),m=Math.floor(f/8);return`
        var<workgroup> workgroup_shared: array<${p.type.value}, ${64*F}>;
        ${t.declareVariables(...u,p)}
        ${t.mainStart([64,1,1])}
          let output_indices = ${p.offsetToIndices(`(global_idx / 64) * ${F}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += 64) {
            //process one block
            var word_offset: u32 = block * ${n.blockSize/N};
            ${(()=>{let t=`
            var col_index = col * ${V};
            ${l?`
            let zero_point_values_per_byte: u32 = ${Math.floor(8/n.bits)}u;
            let zero_point_bytes_per_col = (nBlocksPerCol + zero_point_values_per_byte - 1u) / zero_point_values_per_byte;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_sub_offset: u32 = block % zero_point_values_per_byte;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is ${Math.pow(2,n.bits-1)} for unsigned ${n.bits}-bit quantization.
            let zero_point = ${c}(${Math.pow(2,n.bits-1).toFixed(1)});`}
            `;for(let r=0;r<V*F;r++)t+=`
            let scale${r} = ${o.getByOffset("col_index * nBlocksPerCol + block")};
            ${l?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block / zero_point_values_per_byte);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_sub_offset * ${n.bits}u);
            zero_point_word = ${l.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${r} = ${c}((zero_point_word) & ${2===n.bits?"0x3u":"0xFu"});`:""}
            col_index += 1;`;return t})()}
            for (var word: u32 = 0; word < ${P}; word += ${L}) {
              ${(()=>{let t=`col_index = col * ${V};`;for(let r=0;r<V*F;r++)t+=`
            let b${r}_data = ${a.getByIndices(`${a.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return t+`
            var b_value: u32;
            let b_mask: u32 = ${2===n.bits?"0x03030303u":"0x0F0F0F0Fu"};
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${h};
            var b_dequantized_values: ${h};`})()}
              for (var i: u32 = 0; i < ${L}; i++) {
                ${(()=>{let t="";for(let r=0;r<m;r++){let a=r*n.bits*4,s=a+n.bits;t+=`
          // reuse a data (pass ${r})
            var input_offset${r>0?r:""} = ${0===r?i.indicesToOffset(`${i.type.indices}(batch, row, word_offset)`):"input_offset"};
            var a_data${r>0?r:""}: ${h};
            for (var j${r>0?r:""}: u32 = 0; j${r>0?r:""} < ${8/N}; j${r>0?r:""}++) {
              a_data${r>0?r:""}[j${r>0?r:""}] = ${i.getByOffset(`input_offset${r>0?r:""}`)};
              input_offset${r>0?r:""}++;
            }
          `;for(let i=0;i<V*F;i++)t+=`
            b_value = ${1===L?`b${i}_data`:`b${i}_data[i]`};
            ${2===n.bits?`{
              let half_word = b_value >> ${16*r}u;
              let byte_lo = half_word & 0xFFu;
              let byte_hi = (half_word >> 8u) & 0xFFu;
              let spread_word = (byte_lo & 0xFu) | ((byte_lo >> 4u) << 8u) | ((byte_hi & 0xFu) << 16u) | ((byte_hi >> 4u) << 24u);
              b_value_lower = unpack4xU8(spread_word & b_mask);
              b_value_upper = unpack4xU8((spread_word >> 2u) & b_mask);
            }`:`b_value_lower = unpack4xU8((b_value >> ${a}u) & b_mask);
            b_value_upper = unpack4xU8((b_value >> ${s}u) & b_mask);`}
            b_quantized_values = ${h}(${Array.from({length:4},(t,r)=>`${c}(b_value_lower[${r}]), ${c}(b_value_upper[${r}])`).join(", ")});
            b_dequantized_values = ${1===N?`${h}(${Array.from({length:8},(t,r)=>`(b_quantized_values[${r}] - ${l?`zero_point${i}`:"zero_point"}) * scale${i}`).join(", ")});`:`(b_quantized_values - ${h}(${Array(8).fill(`${l?`zero_point${i}`:"zero_point"}`).join(",")})) * scale${i};`};
            workgroup_shared[local_id.x * ${F} + ${Math.floor(i/V)}]${V>1?`[${i%V}]`:""} += ${Array.from({length:8/N},(t,i)=>`${1===N?`a_data${r>0?r:""}[${i}] * b_dequantized_values[${i}]`:`dot(a_data${r>0?r:""}[${i}], b_dequantized_values[${i}])`}`).join(" + ")};
          `}return t})()}
                word_offset += ${f/N};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${F}) {
            var output_value: ${p.type.value} = ${p.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < 64u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${F};
            }
            ${p.setByIndices(`${p.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`}}))},sv=t=>tR(t)}),sT=l(()=>{eY(),ta(),tY(),sS=(t,r)=>{let i,a,s,n;var o,u,l=t.inputs;if(!l||l.length<1)throw Error("Too few inputs");if(1!==l[0].dataType&&10!==l[0].dataType)throw Error("Input type must be float or float16.");if(l.length>=2){let t=2*l[0].dims.length===l[1].dims[0];if(4===l.length&&(t=2*l[3].dims[0]===l[1].dims[0]),!t)throw Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}let d=((t,r)=>{if(!(t.length>1))return r;{let i=t[1].getBigInt64Array(),a=t.length>=3&&t[2].data?10===t[2].dataType?t[2].getUint16Array()[0]:t[2].getFloat32Array()[0]:0,s=t[0].dims.length,n=new Int32Array(2*s).fill(0);if(t.length>=4){let r=t[3].getBigInt64Array();for(let t=0;t<r.length;t++)n[Number(r[t])]=Number(i[t]),n[Number(r[t])+s]=Number(i[t+r.length])}else i.forEach((t,r)=>n[Number(r)]=Number(t));let o=[];return n.forEach(t=>o.push(t)),{mode:r.mode,value:a,pads:o}}})(t.inputs,r);t.compute((o=t.inputs,u=d,i=e9.padShape(o[0].dims.slice(),u.pads),a=o[0].dims,s=[{type:12,data:e9.size(i)},{type:6,data:u.pads}],n=o.length>=3&&o[2].data,0===u.mode&&s.push({type:n?o[2].dataType:1,data:u.value}),s.push(...tN(o[0].dims,i)),{name:"Pad",shaderCache:{hint:`${u.mode}${n}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:i,dataType:o[0].dataType}],dispatchGroup:{x:Math.ceil(e9.size(i)/64)},programUniforms:s}),getShaderSource:t=>{let r=tH("output",o[0].dataType,i.length),s=tj("x",o[0].dataType,a.length),l=s.type.value,d=((t,r,i)=>{switch(i.mode){case 0:var a=t,s=r,n=i.pads.length;let o="";for(let t=s-1;t>=0;--t)o+=`
            k = i32(${a.indicesGet("indices",t)}) - ${tW("uniforms.pads",t,n)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${tW("uniforms.x_shape",t,s)})) {
              break;
            }
            offset += k * i32(${tW("uniforms.x_strides",t,s)});
        `;return`
          value = ${a.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${o}
            value = x[offset];
          }
      `;case 1:var u=t,l=r,d=i.pads.length;let p="";for(let t=l-1;t>=0;--t)p+=`
                k = i32(${u.indicesGet("indices",t)}) - ${tW("uniforms.pads",t,d)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${tW("uniforms.x_shape",t,l)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${tW("uniforms.x_shape",t,l)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${tW("uniforms.x_strides",t,l)});
            `;return`
              var offset = 0;
              var k = 0;
              ${p}
              value = x[offset];
          `;case 2:var c=t,h=r,f=i.pads.length;let m="";for(let t=h-1;t>=0;--t)m+=`
                k = i32(${c.indicesGet("indices",t)}) - ${tW("uniforms.pads",t,f)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${tW("uniforms.x_shape",t,h)})) {
                  k = i32(${tW("uniforms.x_shape",t,h)}) - 1;
                }
                offset += k * i32(${tW("uniforms.x_strides",t,h)});
            `;return`
              var offset = 0;
              var k = 0;
              ${m}
              value = x[offset];
          `;case 3:var g=t,y=r,_=i.pads.length;let b="";for(let t=y-1;t>=0;--t)b+=`
                k = i32(${g.indicesGet("indices",t)}) - ${tW("uniforms.pads",t,_)};
                if (k < 0)  {
                  k += i32(${tW("uniforms.x_shape",t,y)}]);
                }
                if (k >= i32(${tW("uniforms.x_shape",t,y)})) {
                  k -= i32(${tW("uniforms.x_shape",t,y)});
                }
                offset += k * i32(${tW("uniforms.x_strides",t,y)});
            `;return`
              var offset = 0;
              var k = 0;
              ${b}
              value = x[offset];
          `;default:throw Error("Invalid mode")}})(r,a.length,u),p=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:u.pads.length}];return 0===u.mode&&p.push({name:"constant_value",type:n?l:"f32"}),`
            ${t.registerUniforms(p).declareVariables(s,r)}
            ${t.mainStart()}
            ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${r.offsetToIndices("global_idx")};

            var value = ${l}(0);
            ${d}
            output[global_idx] = value;
        }`}}),{inputs:[0]})}}),sF=l(()=>{ed(),eY(),ta(),tY(),sE=t=>{if(S.webgpu.validateInputContent&&(!t||1!==t.length))throw Error("Pool ops requires 1 input.")},sk=(t,r,i)=>{let a="NHWC"===r.format,s=t.dims.slice();a&&s.splice(1,0,s.pop());let n=Object.hasOwnProperty.call(r,"dilations"),o=r.kernelShape.slice(),u=r.strides.slice(),l=n?r.dilations.slice():[],d=r.pads.slice();te.adjustPoolAttributes(i,s,o,u,l,d);let p=te.computePoolOutputShape(i,s,u,l,o,d,r.autoPad),c=Object.assign({},r);n?Object.assign(c,{kernelShape:o,strides:u,pads:d,dilations:l,cacheKey:r.cacheKey}):Object.assign(c,{kernelShape:o,strides:u,pads:d,cacheKey:r.cacheKey});let h=p.slice();return h.push(h.splice(1,1)[0]),[c,a?h:p]},sI=(t,r)=>{let i="NHWC"===r.format,a=[{type:12,data:e9.size(t)},{type:12,data:e9.size(r.kernelShape)}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(r.kernelShape.length<=2){let t=r.kernelShape[r.kernelShape.length-1],i=r.strides[r.strides.length-1],n=r.pads[r.pads.length/2-1],o=r.pads[r.pads.length-1],u=!!(n+o);a.push({type:12,data:t},{type:12,data:i},{type:12,data:n},{type:12,data:o}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let l=!1;if(2===r.kernelShape.length){let t=r.kernelShape[r.kernelShape.length-2],i=r.strides[r.strides.length-2],n=r.pads[r.pads.length/2-2],o=r.pads[r.pads.length-2];l=!!(n+o),a.push({type:12,data:t},{type:12,data:i},{type:12,data:n},{type:12,data:o}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[a,s,!0,u,l]}{if(i)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let t=e9.computeStrides(r.kernelShape);return a.push({type:12,data:t},{type:12,data:r.pads},{type:12,data:r.strides}),s.push({name:"kernelStrides",type:"u32",length:t.length},{name:"pads",type:"u32",length:r.pads.length},{name:"strides",type:"u32",length:r.strides.length}),[a,s,!!r.pads.reduce((t,r)=>t+r),!1,!1]}},sC=(t,r,i,a,s,n,o,u,l,d,p,c)=>{let h="NHWC"===s.format,f=r.type.value,m=tH("output",r.type.tensor,a);if(s.kernelShape.length<=2){let a="",d="",g="",y=i-(h?2:1);if(a=p?`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${y}] = indices[${y}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${y}] < 0 || xIndices[${y}]
                      >= uniforms.x_shape[${y}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${r.indicesToOffset("xIndices")}];
                  ${n}
                }`:`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${y}] = indices[${y}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${r.indicesToOffset("xIndices")}];
                  ${n}
                }`,2===s.kernelShape.length){let t=i-(h?3:2);d=c?`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${t}] = indices[${t}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${t}] < 0 || xIndices[${t}] >= uniforms.x_shape[${t}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${t}] = indices[${t}] * uniforms.sh - uniforms.phStart + j;
                `,g=`
              }
            `}return`
            ${t.registerUniforms(l).declareVariables(r,m)}

            ${t.mainStart()}
              ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var value = ${f}(${u});
              var pad = 0;
              ${d}
              ${a}
              ${g}
              ${o}

              output[global_idx] = value;
            }`}{if(h)throw Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let a=s.kernelShape.length,p=s.pads.length,c="";return c=d?`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${r.indicesToOffset("xIndices")}];
                ${n}
              }`:`
              }
              let x_val = x[${r.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${t.registerUniforms(l).declareVariables(r,m)}

            ${t.mainStart()}
              ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${m.offsetToIndices("global_idx")};
              var xIndices = ${m.offsetToIndices("global_idx")};

              var offsets: array<u32, ${a}>;

              var value = ${f}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${a-1}u; j++) {
                  offsets[j] = offset / ${tW("uniforms.kernelStrides","j",a)};
                  offset -= offsets[j] * ${tW("uniforms.kernelStrides","j",a)};
                }
                offsets[${a-1}] = offset;

                isPad = false;
                for (var j = ${i-a}u; j < ${i}u; j++) {
                  xIndices[j] = indices[j] * ${tW("uniforms.strides",`j - ${i-a}u`,a)}
                    + offsets[j - ${i-a}u] - ${tW("uniforms.pads","j - 2u",p)};
                  ${c}
              }
              ${o}

              output[global_idx] = value;
            }`}},sz=t=>`${t.format};${t.ceilMode};${t.autoPad};${t.kernelShape.length}`,sA=t=>({format:t.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][t.auto_pad],ceilMode:t.ceil_mode,kernelShape:t.kernel_shape,strides:t.strides,pads:t.pads}),sO=(t,r,i,a)=>{let[s,n]=sk(r,a,i),o=tj("x",r.dataType,r.dims.length),u=o.type.value,l="";s.countIncludePad?l+=`value /= ${u}(uniforms.kernelSize);`:l+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[d,p,c,h,f]=sI(n,s);return d.push(...tN(r.dims,n)),{name:t,shaderCache:{hint:`${a.cacheKey};${c};${h};${f}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(e9.size(n)/64)},programUniforms:d}),getShaderSource:t=>sC(t,o,r.dims.length,n.length,s,"value += x_val;",l,0,p,c,h,f)}},sR=t=>{let r,i=0!==t.count_include_pad,a=sA(t);if(0!==a.ceilMode)throw Error("using ceil() in shape computation is not yet supported for AveragePool");let s={countIncludePad:i,...a,cacheKey:""};return{...s,cacheKey:(r=s,`${sz(r)};${r.countIncludePad}`)}},sB=(t,r)=>{sE(t.inputs),t.compute(sO("AveragePool",t.inputs[0],!1,r))},sM={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},sD=t=>{let r=t.format;return{format:r,...sM,cacheKey:r}},sP=(t,r)=>{sE(t.inputs),t.compute(sO("GlobalAveragePool",t.inputs[0],!0,r))},sU=(t,r,i,a)=>{let[s,n]=sk(r,a,i),o=`
      value = max(x_val, value);
    `,u=tj("x",r.dataType,r.dims.length),[l,d,p,c,h]=sI(n,s);return l.push(...tN(r.dims,n)),{name:t,shaderCache:{hint:`${a.cacheKey};${p};${c};${h}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:n,dataType:r.dataType}],dispatchGroup:{x:Math.ceil(e9.size(n)/64)},programUniforms:l}),getShaderSource:t=>sC(t,u,r.dims.length,n.length,s,o,"",10===r.dataType?-65504:-1e5,d,p,c,h)}},sN=(t,r)=>{sE(t.inputs),t.compute(sU("MaxPool",t.inputs[0],!1,r))},sL=t=>{let r,i=t.storage_order,a=t.dilations,s=sA(t);if(0!==i)throw Error("column major storage order is not yet supported for MaxPool");if(0!==s.ceilMode)throw Error("using ceil() in shape computation is not yet supported for MaxPool");let n={storageOrder:i,dilations:a,...s,cacheKey:""};return{...n,cacheKey:(r=n,`${sz(r)};${r.storageOrder};${r.dilations}`)}},sV=t=>{let r=t.format;return{format:r,...sM,cacheKey:r}},sq=(t,r)=>{sE(t.inputs),t.compute(sU("GlobalMaxPool",t.inputs[0],!0,r))}}),sj=l(()=>{eY(),ta(),tB(),tY(),sW=(t,r)=>{var i,a;let s,n,o,u,l,d,p,c,h,f,m,g,y,_,b,$,w,v,x,S,T,E,k;((t,r)=>{if(t.length<2||t.length>3)throw Error("DequantizeLinear requires 2 or 3 inputs.");if(3===t.length&&t[1].dims===t[2].dims)throw Error("x-scale and x-zero-point must have the same shape.");if(3===t.length&&t[0].dataType!==t[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(0!==t[1].dims.length&&1!==t[1].dims.length&&t[1].dims.length!==t[0].dims.length)throw Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(t.length>2){if(t[0].dataType!==t[2].dataType)throw Error("x and x-zero-point must have the same data type.");if(t[1].dims.length!==t[2].dims.length)throw Error("scale and zero-point inputs must have the same rank.");if(!t[1].dims.map((r,i)=>r===t[2].dims[i]).reduce((t,r)=>t&&r,!0))throw Error("scale and zero-point inputs must have the same shape.")}if(r.blockSize>0){if(0===t[1].dims.length||1===t[1].dims.length&&1===t[1].dims[0])throw Error("blockSize must be set only for block quantization.");if(!t[1].dims.map((i,a)=>a===r.axis||i===t[0].dims[a]).reduce((t,r)=>t&&r,!0))throw Error("For block qunatization, scale input shape to match the input shape except for the axis");if(t[1].dims.length!==t[0].dims.length)throw Error("For block qunatization the scale input rank must be the same as the x rank.");let i=t[0].dims[r.axis],a=t[1].dims[r.axis];if(r.blockSize<Math.ceil(i/a)||r.blockSize>Math.ceil(i/(a-1)-1))throw Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}})(t.inputs,r),t.compute((i=t.inputs,a=r,s=e9.normalizeAxis(a.axis,i[0].dims.length),o=3===(n=i[0].dataType),u=i[0].dims,l=i[1].dataType,d=e9.size(u),c=(p=3===n||2===n)?[Math.ceil(e9.size(i[0].dims)/4)]:i[0].dims,h=i[1].dims,m=(f=i.length>2?i[2]:void 0)?p?[Math.ceil(e9.size(f.dims)/4)]:f.dims:void 0,y=!1==(g=0===h.length||1===h.length&&1===h[0])&&1===h.length,_=tL(d),$=(b=g&&(!p||4===_))?_:1,w=tj("input",p?12:n,c.length,b&&!p?_:1),v=tj("scale",l,h.length),x=f?tj("zero_point",p?12:n,m.length):void 0,S=tH("output",l,u.length,$),T=[w,v],x&&T.push(x),E=[c,h],f&&E.push(m),k=[{type:12,data:d/$},{type:12,data:s},{type:12,data:a.blockSize},...tN(...E,u)],{name:"DequantizeLinear",shaderCache:{hint:a.cacheKey,inputDependencies:x?["rank","rank","rank"]:["rank","rank"]},getShaderSource:t=>`
      ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}]).declareVariables(...T,S)}
      ${t.mainStart()}
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${S.offsetToIndices("global_idx")};

          // Set input x
          ${p?`
            let input = ${w.getByOffset("global_idx / 4")};
            let x_vec = ${o?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${1===$?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${w.getByOffset("global_idx")};`};

          // Set scale input
          ${g?`let scale_value= ${v.getByOffset("0")}`:y?`
            let scale_index = ${S.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${v.getByOffset("scale_index")};`:`
            var scale_indices: ${v.type.indices} = output_indices;
            let index = ${v.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${v.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${v.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${x?g?p?`
                let zero_point_input = ${x.getByOffset("0")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${x.getByOffset("0")}`:y?p?`
                let zero_point_index = ${S.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${x.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${S.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${x.getByOffset("zero_point_index")};`:p?`
                let zero_point_offset = ${v.indicesToOffset("scale_indices")};
                let zero_point_input = ${x.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${o?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${x.getByIndices("scale_indices")};`:`let zero_point_value = ${p?o?"i32":"u32":w.type.value}(0);`};
      // Compute and write output
      ${S.setByOffset("global_idx",`${S.type.value}(x_value - zero_point_value) * scale_value`)};
      }`,getRunData:()=>({outputs:[{dims:u,dataType:l}],dispatchGroup:{x:Math.ceil(d/$/64),y:1,z:1},programUniforms:k})}))},sG=t=>tR({axis:t.axis,blockSize:t.blockSize})}),sK=l(()=>{ed(),eY(),tY(),sH=t=>{var r,i,a,s;let n,o,u,l=0,d=0,p=0;6===t.inputs[0].dataType?(l=t.inputs[0].getInt32Array()[0],d=t.inputs[1].getInt32Array()[0],p=t.inputs[2].getInt32Array()[0]):1===t.inputs[0].dataType&&(l=t.inputs[0].getFloat32Array()[0],d=t.inputs[1].getFloat32Array()[0],p=t.inputs[2].getFloat32Array()[0]),S.webgpu.validateInputContent&&((t,r,i)=>{if(t===r||t<r&&i<0||t>r&&i>0)throw Error("Range these inputs' contents are invalid.")})(l,d,p),t.compute((r=l,i=d,a=p,s=t.inputs[0].dataType,o=[n=Math.abs(Math.ceil((i-r)/a))],u=[{type:12,data:n},{type:s,data:r},{type:s,data:a},...tN(o)],{name:"Range",shaderCache:{hint:`${s}`},getShaderSource:t=>{let r=tH("output",s,o.length),i=r.type.value;return`
        ${t.registerUniforms([{name:"outputSize",type:"u32"},{name:"start",type:i},{name:"delta",type:i}]).declareVariables(r)}
        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${i}(global_idx) * uniforms.delta;
      }`},getRunData:()=>({outputs:[{dims:o,dataType:s}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:u})}),{inputs:[]})}}),sX=l(()=>{eY(),ta(),tB(),tY(),sZ=t=>tR({reduction:t.reduction}),sQ=(t,r)=>{var i,a;let s,n,o,u,l,d;t.compute((i=t.inputs,a=r,s=i[0].dims,n=i[1].dims,o=Math.ceil(e9.sizeToDimension(n,n.length-1)/1),u=n[n.length-1],l=e9.sizeFromDimension(s,u),d=[{type:12,data:o},{type:12,data:u},{type:12,data:l},...tN(i[1].dims,i[2].dims,s)],{name:"ScatterND",shaderCache:{hint:`${a.cacheKey}_${a.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:i[0].dataType}],dispatchGroup:{x:Math.ceil(o/64)},programUniforms:d}),getShaderSource:t=>{let r=tj("indices",i[1].dataType,i[1].dims.length),n=tj("updates",i[2].dataType,i[2].dims.length,1),o="none"!==a.reduction&&""!==a.reduction?tK("output",i[0].dataType,s.length):tH("output",i[0].dataType,s.length,1);return`
      ${t.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(r,n,o)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${1===i[0].dims.length?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${((t,r,i,a)=>{if("none"!==t&&"i32"!==a&&"u32"!==a&&"f32"!==a)throw Error(`Input ${a} is not supported with reduction ${t}.`);let s=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,n=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${r}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(t){case"none":return`${r}=${i};`;case"add":return"i32"===a||"u32"===a?`atomicAdd(&${r}, bitcast<${a}>(${i}));`:`
              ${s}bitcast<${a}>(oldValue) + (${i})${n}`;case"max":return"i32"===a||"u32"===a?`atomicMax(&${r}, bitcast<${a}>(${i}));`:`
                ${s}max(bitcast<f32>(oldValue), (${i}))${n}`;case"min":return"i32"===a||"u32"===a?`atomicMin(&${r}, bitcast<${a}>(${i}));`:`${s}min(bitcast<${a}>(oldValue), (${i}))${n}`;case"mul":return`${s}(bitcast<${a}>(oldValue) * (${i}))${n}`;default:throw Error(`Reduction ${t} is not supported.`)}})(a.reduction,"output[data_offset + i]","value",o.type.value)}
  }

      }`}}),{inputs:[t.inputs[1],t.inputs[2]],outputs:[]})}}),s2=l(()=>{eY(),ta(),tB(),tY(),sY=(t,r,i,a)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${t}) * (${r});
  let whole = ${a}(big / (${i}));
  let fract = ${a}(big % (${i})) / ${a}(${i});
  return whole + fract;
`,sJ=(t,r,i,a)=>t.rank>a?`
    ${t.indicesSet("input_indices",r,"channel")};
    ${t.indicesSet("input_indices",i,"batch")};
`:"",s0=(t,r)=>{var i,a,s,n,o,u,l,d,p,c,h,f;let m,g,y,_,b,$,w,v,x,S,T,E,k,I,C,z,A=[],O=[],R=[],B=new Uint32Array(m=t.customDataBuffer,m.byteOffset,1)[0];if(0!==r.antialias)throw Error("Only default value (0) for Antialias attribute is supported");((t,r,i,a,s,n)=>{let[o,u,l]=i>10?[1,2,3]:[-1,t.length>1?1:-1,-1],d=t[0].dims.length;if(o>0&&t.length>o&&t[o].dims.length>0)t[o].getFloat32Array().forEach(t=>n.push(t));else if("tf_crop_and_resize"===r.coordinateTransformMode)throw Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&t.length>u&&1===t[u].dims.length&&t[u].dims[0]>0){var p,c,h;let s;if(t[u].getFloat32Array().forEach(t=>a.push(t)),0!==a.length&&a.length!==d&&i>=18&&a.length!==r.axes.length)throw Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");((t,r)=>{if(t.every(t=>t>0||(()=>{throw Error("Resize requires scales input values to be positive")})),t.length>0){if("linear"===r.mode){if(2!==t.length&&3!==t.length&&(4!==t.length||1!==t[0]||1!==t[1])&&(4!==t.length||1!==t[0]||1!==t[3])&&(5!==t.length||1!==t[0]||1!==t[1]))throw Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if("cubic"===r.mode&&2!==t.length&&(4!==t.length||1!==t[0]||1!==t[1])&&(4!==t.length||1!==t[0]||1!==t[3]))throw Error("Resize requires scales input size to be 2 or 4 for cubic mode")}})(a,r),r.axes.length>0&&(p=a,c=r.axes,h=d,c.every(t=>t>=0&&t<h||(()=>{throw Error("Resize requires axes input values to be positive and less than rank")})),s=Array(h).fill(1),c.forEach((t,r)=>s[t]=p[r]),s).forEach((t,r)=>a[r]=t)}if(l>0&&t.length>l&&1===t[l].dims.length&&t[l].dims[0]>0&&(t[l].getBigInt64Array().forEach(t=>s.push(Number(t))),0!==s.length&&s.length!==d&&i>=18&&s.length!==r.axes.length))throw Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(r.axes.length>0){if(0!==a.length&&a.length!==r.axes.length)throw Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(0!==s.length&&s.length!==r.axes.length)throw Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if("u">typeof a&&"u">typeof s&&a.length>0&&s.length>d)throw Error("Resize requires only of scales or sizes to be specified")})(t.inputs,r,B,A,O,R),t.compute((i=t.inputs[0],a=r,s=B,n=A,o=O,u=R,_=i.dims,b=(l=u,d=a.axes,g=Array(p=_.length).fill(0).concat(Array(p).fill(1)),y=0===l.length?g:l.slice(),d.length>0?(d.forEach((t,r)=>{g[t]=y[r],g[r+p]=y[d.length+r]}),g):y),$=((t,r,i,a)=>{let s=[];if(i.length>0)if(a.length>0){if(t.forEach(t=>s.push(t)),Math.max(...a)>t.length)throw Error("axes is out of bound");a.forEach((t,r)=>s[t]=i[r])}else i.forEach(t=>s.push(t));else{if(0===r.length)throw Error("Resize requires either scales or sizes.");s=t.map((t,i)=>Math.round(t*r[i]))}return s})(_,n,o,a.axes),w=n.slice(),0===n.length&&(w=_.map((t,r)=>0===t?1:$[r]/t),"stretch"!==a.keepAspectRatioPolicy&&(c=_,h=w,f=a,v=(()=>{switch(f.keepAspectRatioPolicy){case"not_larger":return f.axes.length>0?Math.min(...f.axes.map(t=>h[t]),Number.MAX_VALUE):Math.min(...h,Number.MAX_VALUE);case"not_smaller":return f.axes.length>0?Math.max(...f.axes.map(t=>h[t]),5e-324):Math.max(...h,5e-324);default:throw Error(`Keep aspect ratio policy ${f.keepAspectRatioPolicy} is not supported`)}})(),h.fill(1,0,h.length),x=c.slice(),f.axes.length>0?(f.axes.forEach(t=>h[t]=v),f.axes.forEach(t=>x[t]=Math.round(c[t]*h[t]))):(h.fill(v,0,h.length),x.forEach((t,r)=>x[r]=Math.round(t*h[r]))),$=x)),S=tH("output",i.dataType,$.length),T=tj("input",i.dataType,_.length),E=e9.size($),k=_.length===$.length&&_.every((t,r)=>t===$[r]),I="tf_crop_and_resize"===a.coordinateTransformMode,C=a.extrapolationValue,z=T.type.value,{name:"Resize",shaderCache:{hint:`${a.cacheKey}|${s}|${w.length>0?"cubic"===a.mode?w:w.length:""}|${o.length>0?o:""}|${b.length>0?b:""}|${k}|${"nearest"===a.mode?_.length:_}`,inputDependencies:["rank"]},getShaderSource:t=>{let r,i;return`
      ${k?"":`
      ${r=a.coordinateTransformMode,i=z,`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${i} { `+(()=>{switch(r){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${i}(xResized) / ${i}(xScale);
          } else {
            ${sY("xResized","lengthOriginal","lengthResized",i)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${i}(xResized) + 0.5) / ${i}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${i}(xResized) + 0.5) / ${i}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${sY("xResized","lengthOriginal - 1","lengthResized - 1",i)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${i}(roiStart) * ${i}(lengthOriginal - 1) +
                        (${i}(xResized) * ${i}(roiEnd - roiStart) * ${i}(lengthOriginal - 1)) /
                        ${i}(lengthResized - 1);
                  } else {
                    return 0.5 * ${i}(roiStart + roiEnd) * ${i}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${i}xScale * ${i}(lengthResized);
                  const adjustment = ${i}(lengthResized) / outputWidth;
                  const center = ${i}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${i}(xResized) + 0.5) / ${i}(xScale)) - 0.5;`;case"half_pixel":return`return ((${i}(xResized) + 0.5) / ${i}(xScale)) - 0.5;`;default:throw Error(`Coordinate transform mode ${r} is not supported`)}})()+"}"};
      ${(()=>{switch(a.mode){case"nearest":let t,r,i,n,o,u,l,d,p,c,h,f;return`
              ${t=T,r=_,`
    fn checkInputIndices(input_indices: ${t.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var input_index = ${t.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${tW("uniforms.input_shape","i",r.length)}) {
          return false;
        }
      }
      return true;
    }`};
              ${i=a.nearestMode,n=s,o=z,`fn getNearestPixelFromOriginal(xOriginal: ${o}, isDownSample: bool) -> ${o} {`+(()=>{switch(i){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(n<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw Error(`Nearest mode ${i} is not supported`)}})()+"}"};
              ${u=T,l=S,d=_,p=$,c=w.length,h=b.length,f=I,`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${l.type.indices}) -> ${u.type.indices} {
      var input_indices: ${u.type.indices};
      for (var i:u32 = 0; i < ${p.length}; i++) {
        var output_index = ${l.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${tW("uniforms.scales","i",c)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${tW("uniforms.roi","i",h)};
          var roi_hi = ${tW("uniforms.roi",`i + ${d.length}`,h)};
          var input_shape_i = ${tW("uniforms.input_shape","i",d.length)};
          var output_shape_i = ${tW("uniforms.output_shape","i",p.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${f} || (original_idx >= 0 && original_idx < ${l.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${l.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${u.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`};
              `;case"linear":let m,g,y,v,x;return`
              ${m=S,g=_,y=$,v=w.length,x=b.length,`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${m.type.indices}) -> array<${m.type.value}, ${y.length}> {
      var original_indices: array<${m.type.value}, ${y.length}>;
      for (var i:u32 = 0; i < ${y.length}; i++) {
        var output_index = ${m.indicesGet("output_indices","i")};
        var scale = ${tW("uniforms.scales","i",v)};
        var roi_low = ${tW("uniforms.roi","i",x)};
        var roi_hi = ${tW("uniforms.roi",`i + ${g.length}`,x)};
        if (scale == 1.0) {
          original_indices[i] = ${m.type.value}(output_index);
        } else {
          var input_shape_i = ${tW("uniforms.input_shape","i",g.length)};
          var output_shape_i = ${tW("uniforms.output_shape","i",y.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`};
              ${(()=>{if(2===_.length||4===_.length)return`${((t,r,i,a,s)=>{let[n,o,u,l]=2===i.length?[-1,0,1,-1]:[0,2,3,1],d=t.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${t.type.indices};
      ${t.indicesSet("input_indices",o,`max(0, min(row, ${i[o]} - 1))`)};
      ${t.indicesSet("input_indices",u,`max(0, min(col, ${i[u]} - 1))`)};
      ${sJ(t,l,n,2)}
      return ${t.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${r.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${o}];
      var col:${d} = originalIndices[${u}];
      ${a?`if (row < 0 || row > (${i[o]} - 1) || col < 0 || col > (${i[u]} - 1)) {
        return ${s};
      }`:""};
      row = max(0, min(row, ${i[o]} - 1));
      col = max(0, min(col, ${i[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${i.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${i.length>2?`u32(originalIndices[${n}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`})(T,S,_,I,C)}`;if(3===_.length||5===_.length)return`${((t,r,i,a,s)=>{let[n,o,u,l,d]=3===i.length?[-1,0,1,2,-1]:[0,2,3,4,1],p=t.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${p} {
      var input_indices: ${t.type.indices};
      ${t.indicesSet("input_indices",o,`max(0, min(depth, ${i[o]} - 1))`)};
      ${t.indicesSet("input_indices",u,`max(0, min(height, ${i[u]} - 1))`)};
      ${t.indicesSet("input_indices",l,`max(0, min(width, ${i[l]} - 1))`)};
      ${sJ(t,d,n,3)}
      return ${t.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${r.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${p} = originalIndices[${o}];
      var height:${p} = originalIndices[${u}];
      var width:${p} = originalIndices[${l}];
      ${a?`if (depth < 0 || depth > (${i[o]} - 1) || height < 0 || height > (${i[u]} - 1) || width < 0 || (width > ${i[l]} - 1)) {
      return ${s};
        }`:""};

    depth = max(0, min(depth, ${i[o]} - 1));
      height = max(0, min(height, ${i[u]} - 1));
      width = max(0, min(width, ${i[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${i.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${i.length>3?`u32(originalIndices[${n}])`:"0"};

      var x111: ${p} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${p} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${p} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${p} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${p} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${p} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${p} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${p} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${p} = abs(depth - ${p}(depth1));
      var dx2: ${p} = abs(${p}(depth2) - depth);
      var dy1: ${p} = abs(height - ${p}(height1));
      var dy2: ${p} = abs(${p}(height2) - height);
      var dz1: ${p} = abs(width - ${p}(width1));
      var dz2: ${p} = abs(${p}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`})(T,S,_,I,C)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(2===_.length||4===_.length)return`${((t,r,i,a,s,n,o,u,l,d)=>{let[p,c]=2===i.length?[0,1]:[2,3],h=t.type.value,f=o=>{let c=o===p?"row":"col";return`
      fn ${c}CubicInterpolation(input_indices: ${t.type.indices}, output_indices: ${r.type.indices}) -> ${h} {
        var output_index = ${r.indicesGet("output_indices",o)};
        var originalIdx: ${h} = getOriginalCoordinateFromResizedCoordinate(output_index, ${s[o]},
        ${a[o]}, ${i[o]}, ${n[o]}, ${n[o]} + ${i.length});
        var fractOriginalIdx: ${h} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${i[o]} - 1))) {
          return ${l};
        }
        var data: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${c}: ${h} = originalIdx + ${h}(i);
          if (${c} < 0 || ${c} >= ${i[o]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${c} = max(0, min(${c}, ${i[o]} - 1));`};
          }
        var input_indices_copy: ${t.type.indices} = input_indices;
          ${t.indicesSet("input_indices_copy",o,`u32(${c})`)};
          data[i + 1] = ${o===p?t.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${f(p)};
    ${f(c)};
  fn getCubicInterpolationCoefs(s: ${h}) -> array<${h}, 4> {
    var absS = abs(s);
    var coeffs: array<${h}, 4> = array<${h}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${h} = 1.0 - absS;
    var twoMinusAbsS: ${h} = 2.0 - absS;
    var onePlusAbsS: ${h} = 1.0 + absS;
    coeffs[0] = ((${o} * onePlusAbsS - 5 * ${o}) * onePlusAbsS + 8 * ${o}) * onePlusAbsS - 4 * ${o};
    coeffs[1] = ((${o} + 2) * absS - (${o} + 3)) * absS * absS + 1;
    coeffs[2] = ((${o} + 2) * oneMinusAbsS - (${o} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${o} * twoMinusAbsS - 5 * ${o}) * twoMinusAbsS + 8 * ${o}) * twoMinusAbsS - 4 * ${o};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${h}, 4>, coefs: array<${h}, 4>) -> ${h} {
    var coefsSum: ${h} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${r.type.indices}) -> ${h} {
    var input_indices: ${t.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `})(T,S,_,$,w,b,a.cubicCoeffA,I,a.extrapolationValue,a.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${t.registerUniform("output_size","u32").registerUniform("scales","f32",w.length).registerUniform("roi","f32",b.length).declareVariables(T,S)}
      ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${k?"output[global_idx] = input[global_idx];":`
        let output_indices = ${S.offsetToIndices("global_idx")};
        var input_indices: ${T.type.indices};
        ${(()=>{switch(a.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${T.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${a.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${2===_.length||4===_.length?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${a.mode}`)}})()};
`}
      }`},getRunData:()=>({outputs:[{dims:$,dataType:i.dataType}],dispatchGroup:{x:Math.ceil(E/64)},programUniforms:[{type:12,data:E},{type:1,data:w},{type:1,data:b},...tN(_,$)]})}),{inputs:[0]})},s1=t=>{let r=t.antialias,i=t.axes,a=t.coordinateTransformMode,s=t.cubicCoeffA,n=0!==t.excludeOutside,o=t.extrapolationValue,u=t.keepAspectRatioPolicy,l=t.mode,d=""===t.nearestMode?"simple":t.nearestMode;return tR({antialias:r,axes:i,coordinateTransformMode:a,cubicCoeffA:s,excludeOutside:n,extrapolationValue:o,keepAspectRatioPolicy:u,mode:l,nearestMode:d})}}),s4=l(()=>{eY(),ta(),tY(),s3=(t,r)=>{var i,a,s,n;let o,u,l,d,p,c,h,f,m,g,y,_,b;(t=>{if(!t||t.length<3)throw Error("layerNorm requires at least 3 inputs.");let r=t[0],i=t[1],a=t[2];if(r.dataType!==i.dataType||r.dataType!==a.dataType)throw Error("All inputs must have the same data type");if(3!==r.dims.length&&2!==r.dims.length)throw Error("Input must be 2D or 3D");if(3!==i.dims.length&&2!==i.dims.length)throw Error("Skip must be 2D or 3D");let s=r.dims[r.dims.length-1],n=r.dims[r.dims.length-2];if(i.dims[i.dims.length-1]!==s)throw Error("Skip must have the same hidden size as input");if(i.dims[i.dims.length-2]!==n)throw Error("Skip must have the same sequence length as input");if(1!==a.dims.length)throw Error("Gamma must be 1D");if(a.dims[a.dims.length-1]!==s)throw Error("Gamma must have the same hidden size as input");if(t.length>3){let r=t[3];if(1!==r.dims.length)throw Error("Beta must be 1D");if(r.dims[r.dims.length-1]!==s)throw Error("Beta must have the same hidden size as input")}if(t.length>4){let r=t[4];if(1!==r.dims.length)throw Error("Bias must be 1D");if(r.dims[r.dims.length-1]!==s)throw Error("Bias must have the same hidden size as input")}})(t.inputs);let $=[0];t.outputCount>1&&$.push(-3),t.outputCount>2&&$.push(-3),t.outputCount>3&&$.push(3),t.compute((i=t.inputs,a=r,s=t.outputCount,n=!1,o=a.simplified,u=i[0].dims,l=e9.size(u),d=u.slice(-1)[0],p=n?u.slice(0,-1).concat(1):[],c=!o&&i.length>3,h=i.length>4,f=n&&s>1,m=n&&s>2,g=s>3,_=[{type:12,data:l},{type:12,data:y=tL(d)},{type:12,data:d},{type:1,data:a.epsilon}],b=[{dims:u,dataType:i[0].dataType}],s>1&&b.push({dims:p,dataType:1}),s>2&&b.push({dims:p,dataType:1}),s>3&&b.push({dims:u,dataType:i[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${y};${f};${m};${g}`,inputDependencies:i.map((t,r)=>"type")},getShaderSource:t=>{let r=[tj("x",i[0].dataType,i[0].dims,y),tj("skip",i[1].dataType,i[1].dims,y),tj("gamma",i[2].dataType,i[2].dims,y)];c&&r.push(tj("beta",i[3].dataType,i[3].dims,y)),h&&r.push(tj("bias",i[4].dataType,i[4].dims,y)),r.push(tH("output",i[0].dataType,u,y)),f&&r.push(tH("mean_output",1,p)),m&&r.push(tH("inv_std_output",1,p)),g&&r.push(tH("input_skip_bias_sum",i[0].dataType,u,y));let a=tP(i[0].dataType),s=tP(1,y);return`

      ${t.registerUniforms([{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}]).declareVariables(...r)}
      var<workgroup> sum_shared : array<${s}, 64>;
      var<workgroup> sum_squared_shared : array<${s}, 64>;

      ${t.mainStart([64,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / 64;

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / 64;
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == 63) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${h?"bias[offset1d + i]":a+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${g?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${tq(a,y,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = 64;
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${tF("sum",y)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${tF("square_sum",y)} / f32(uniforms.hidden_size) ${o?"":"- mean * mean"} + uniforms.epsilon);
        ${f?"mean_output[global_idx] = mean;":""}
        ${m?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${o?"":`- ${a}(mean)`}) *
            ${a}(inv_std_dev) * gamma[offset1d + i]
            ${c?"+ beta[offset1d + i]":""};
        }
      }`},getRunData:()=>({outputs:b,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:_})}),{outputs:$})}}),s9=l(()=>{eY(),ta(),tB(),tY(),s6=(t,r)=>{let i=[];if(t.length>r)if(7===t[r].dataType)t[r].getBigInt64Array().forEach(t=>i.push(Number(t)));else if(6===t[r].dataType)t[r].getInt32Array().forEach(t=>i.push(Number(t)));else throw Error(`Input ${r} must be an array of int32 or int64`);return i},s8=(t,r,i,a,s)=>{let n=t;return t<0&&(n+=i[a[r]]),s[r]<0?Math.max(0,Math.min(n,i[a[r]]-1)):Math.max(0,Math.min(n,i[a[r]]))},s5=(t,r)=>{var i=t.inputs,a=r;if(!i||i.length<1)throw Error("too few inputs");if(0!==a.axes.length){if(a.axes.length!==a.starts.length||a.axes.length!==a.ends.length)throw Error("axes, starts and ends must have the same length")}else if(a.starts.length!==a.ends.length)throw Error("starts and ends must have the same length");i.slice(1).forEach((t,r)=>{if(6!==i[r+1].dataType&&7!==i[r+1].dataType)throw Error(`Input ${r} must be an array of int32 or int64`)});let s=((t,r)=>{if(!(t.length>1))return r;{let r=s6(t,1),i=s6(t,2),a=s6(t,3);return 0===a.length&&(a=[...Array(t[0].dims.length).keys()]),tR({starts:r,ends:i,axes:a})}})(t.inputs,r);t.compute(((t,r)=>{let i=t[0].dims,a=e9.size(i),s=r.axes.length>0?e9.normalizeAxes(r.axes,i.length):[...Array(i.length).keys()],n=s6(t,4);n.forEach(t=>0!==t||(()=>{throw Error("step cannot be 0")})),0===n.length&&(n=Array(s.length).fill(1));let o=r.starts.map((t,r)=>s8(t,r,i,s,n)),u=r.ends.map((t,r)=>s8(t,r,i,s,n));if(s.length!==o.length||s.length!==u.length)throw Error("start, ends and axes should have the same number of elements");if(s.length!==i.length)for(let t=0;t<i.length;++t)s.includes(t)||(o.splice(t,0,0),u.splice(t,0,i[t]),n.splice(t,0,1));let l=n.map(t=>Math.sign(t));n.forEach((t,r,i)=>{if(t<0){let a=(u[r]-o[r])/t,s=o[r],l=s+a*n[r];o[r]=l,u[r]=s,i[r]=-t}});let d=i.slice(0);s.forEach((t,r)=>{d[t]=Math.ceil((u[t]-o[t])/n[t])});let p={dims:d,dataType:t[0].dataType},c=tH("output",t[0].dataType,d.length),h=tj("input",t[0].dataType,t[0].dims.length),f=e9.size(d),m=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:o.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:n.length}],g=[{type:12,data:f},{type:12,data:o},{type:6,data:l},{type:12,data:n},...tN(t[0].dims,d)];return{name:"Slice",shaderCache:{hint:`${l.length}_${o.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:t=>{let r,a,s;return`
      ${t.registerUniforms(m).declareVariables(h,c)}
        ${r=h,a=c,s=i,`fn calculateInputIndices(output_indices: ${a.type.indices}) -> ${r.type.indices} {
          var input_indices: ${r.type.indices};
          var carry = 0u;
          for (var i = ${s.length-1}; i >= 0; i--) {
            let input_shape_i = ${tW("uniforms.input_shape","i",s.length)};
            let steps_i = ${tW("uniforms.steps","i",s.length)};
            let signs_i = ${tW("uniforms.signs","i",s.length)};
            let starts_i = ${tW("uniforms.starts","i",s.length)};
            var output_index = ${a.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${r.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`}
        ${t.mainStart()}
          ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${c.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${c.setByOffset("global_idx",h.getByIndices("input_indices"))}
      }`},getRunData:()=>({outputs:[p],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:g})}})(t.inputs,s),{inputs:[0]})},s7=t=>{let r=t.starts,i=t.ends,a=t.axes;return tR({starts:r,ends:i,axes:a})}}),nr=l(()=>{eY(),ta(),tB(),t3(),tY(),ne=(t,r)=>{var i,a;let s,n,o,u,l,d,p,c,h,f,m,g,y,_,b,$,w,v,x;(t=>{if(!t||1!==t.length)throw Error("Softmax op requires 1 input.")})(t.inputs),i=t,a=r,n=(s=i.inputs[0]).dims,o=e9.size(n),u=n.length,d=(l=e9.normalizeAxis(a.axis,u))<n.length-1,c=[],d?((c=Array.from({length:u},(t,r)=>r))[l]=u-1,c[u-1]=l,p=i.compute(t0(s,c),{inputs:[s],outputs:[-1]})[0]):p=s,m=o/(f=(h=p.dims)[u-1]),g=tL(f),y=f/g,_=64,1===m&&(_=256),b=tj("x",p.dataType,p.dims,g),$=tH("result",p.dataType,p.dims,g),w=b.type.value,v="f32"===tP(p.dataType)?`var threadMax = ${w}(-3.4028234663852886e+38f);`:`var threadMax = ${w}(-65504.0h);`,x=i.compute({name:"Softmax",shaderCache:{hint:`${g};${_}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:h,dataType:p.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:y}]}),getShaderSource:t=>{let r;return`
      var<workgroup> rowMaxShared : ${w};
      var<workgroup> rowSumShared : ${w};
      var<workgroup> threadShared : array<${w}, ${_}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${w} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${w}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${t.registerUniform("packedCols","i32").declareVariables(b,$)}
      ${t.mainStart(_)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${_};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${v}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${w}(${r="threadShared[0]",4===g?`max(max(${r}.x, ${r}.y), max(${r}.z, ${r}.w))`:2===g?`max(${r}.x, ${r}.y)`:3===g?`max(max(${r}.x, ${r}.y), ${r}.z)`:r});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${w}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${w}(${tF("threadShared[0]",g)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${w}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`}},{inputs:[p],outputs:[d?-1:0]})[0],d&&i.compute(t0(x,c),{inputs:[x]})},nt=t=>tR({axis:t.axis})}),ns=l(()=>{eY(),ta(),tY(),ni=t=>Array.from(t.getBigInt64Array(),Number),na=t=>{var r;let i,a,s,n,o,u,l;(t=>{if(!t||2!==t.length)throw Error("Tile requires 2 inputs.");if(1!==t[0].dataType&&10!==t[0].dataType&&6!==t[0].dataType&&12!==t[0].dataType)throw Error("Tile only support float, float16, int32, and uint32 data types");if(7!==t[1].dataType)throw Error("Tile `repeats` input should be of int64 data type");if(1!==t[1].dims.length)throw Error("Tile `repeats` input should be 1-D");if(ni(t[1]).length!==t[0].dims.length)throw Error("Tile `repeats` input should have same number of elements as rank of input data tensor")})(t.inputs),t.compute((i=(r=t.inputs)[0].dims,s=((t,r)=>{let i=[];for(let a=0;a<t.length;++a)i.push(t[a]*r[a]);return i})(i,a=(void 0)??ni(r[1])),n=e9.size(s),o=r[0].dataType,u=tj("input",o,i.length),l=tH("output",o,s.length),{name:"Tile",shaderCache:{hint:`${a}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:s,dataType:r[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...tN(r[0].dims,s)]}),getShaderSource:t=>`
      const inputShape = ${u.indices(...i)};
      ${t.registerUniform("output_size","u32").declareVariables(u,l)}
      ${t.mainStart()}
      ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${i.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`}),{inputs:[0]})}}),no=l(()=>{eY(),ta(),tY(),nn=t=>{t.compute((t=>{let r=t[1].dims,i=t[2].dims,a=t[0].dims,s=t[1].dataType,n=!(e9.areEqual(r,i)&&e9.areEqual(i,a)),o=r,u=e9.size(r);if(n){let t=e7.calcShape(e7.calcShape(r,i,!1),a,!1);if(!t)throw Error("Can't perform where op on the given tensors");o=t,u=e9.size(o)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:r=>((t,r,i,a,s)=>{let n=tH("output_data",s,i.length,4),o=tj("a_data",r[1].dataType,r[1].dims.length,4),u=tj("b_data",r[2].dataType,r[2].dims.length,4),l=tj("c_data",r[0].dataType,r[0].dims.length,4),d,p=(t,r,i)=>`select(${r}, ${t}, ${i})`;if(a){let t=(t,r,i="")=>{let a=`a_data[index_a${r}][component_a${r}]`,s=`b_data[index_b${r}][component_b${r}]`,d=`bool(c_data[index_c${r}] & (0xffu << (component_c${r} * 8)))`;return`
            let output_indices${r} = ${n.offsetToIndices(`global_idx * 4u + ${r}u`)};
            let offset_a${r} = ${o.broadcastedIndicesToOffset(`output_indices${r}`,n)};
            let offset_b${r} = ${u.broadcastedIndicesToOffset(`output_indices${r}`,n)};
            let offset_c${r} = ${l.broadcastedIndicesToOffset(`output_indices${r}`,n)};
            let index_a${r} = offset_a${r} / 4u;
            let index_b${r} = offset_b${r} / 4u;
            let index_c${r} = offset_c${r} / 4u;
            let component_a${r} = offset_a${r} % 4u;
            let component_b${r} = offset_b${r} % 4u;
            let component_c${r} = offset_c${r} % 4u;
            ${t}[${r}] = ${i}(${p(a,s,d)});
          `};d=9===s?`
            var data = vec4<u32>(0);
            ${t("data",0,"u32")}
            ${t("data",1,"u32")}
            ${t("data",2,"u32")}
            ${t("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:`
            ${t("output_data[global_idx]",0)}
            ${t("output_data[global_idx]",1)}
            ${t("output_data[global_idx]",2)}
            ${t("output_data[global_idx]",3)}
          `}else d=n.setByOffset("global_idx",p(o.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));return`
        ${t.registerUniform("vec_size","u32").declareVariables(l,o,u,n)}
        ${t.mainStart()}
        ${t.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`})(r,t,o,n,s),getRunData:()=>({outputs:[{dims:o,dataType:s}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...tN(a,r,i,o)]})}})(t.inputs))}}),nl=l(()=>{rA(),rM(),rP(),rN(),iv(),iB(),iP(),au(),ay(),a$(),ax(),aO(),aM(),aP(),aL(),aF(),aj(),aZ(),aY(),a8(),sh(),sg(),s_(),s$(),sx(),sr(),sT(),sF(),sj(),sK(),sX(),rE(),s2(),sl(),s4(),s9(),nr(),sn(),ns(),t3(),i$(),no(),nu=new Map([["Abs",[rV]],["Acos",[rq]],["Acosh",[rF]],["Add",[iS]],["ArgMax",[rC,rz]],["ArgMin",[rI,rz]],["Asin",[rW]],["Asinh",[rG]],["Atan",[rj]],["Atanh",[rH]],["Attention",[rB]],["AveragePool",[sB,sR]],["BatchNormalization",[rD]],["BiasAdd",[rU]],["BiasSplitGelu",[iw]],["Cast",[rZ,rK]],["Ceil",[rX]],["Clip",[rQ]],["Concat",[iM,iD]],["Conv",[ao,as]],["ConvTranspose",[ag,af]],["Cos",[rY]],["Cosh",[rJ]],["CumSum",[a_,ab]],["DepthToSpace",[aw,av]],["DequantizeLinear",[sW,sG]],["Div",[iT]],["Einsum",[az,aA]],["Elu",[r1,r0]],["Equal",[iE]],["Erf",[r3]],["Exp",[r4]],["Expand",[aB]],["FastGelu",[aD]],["Floor",[r6]],["FusedConv",[ao,as]],["Gather",[aN,aU]],["GatherElements",[aK,aH]],["GatherBlockQuantized",[aW,aG]],["GatherND",[aV,aq]],["Gelu",[r8]],["Gemm",[aX,aQ]],["GlobalAveragePool",[sP,sD]],["GlobalMaxPool",[sq,sV]],["Greater",[iz]],["GreaterOrEqual",[iO]],["GridSample",[a4,a6]],["GroupQueryAttention",[sc]],["HardSigmoid",[ia,ii]],["InstanceNormalization",[sm]],["LayerNormalization",[sy]],["LeakyRelu",[r5,r0]],["Less",[iA]],["LessOrEqual",[iR]],["Log",[iy]],["MatMul",[sb]],["MatMulNBits",[sw,sv]],["MaxPool",[sN,sL]],["Mul",[ik]],["MultiHeadAttention",[st,a7]],["Neg",[r9]],["Not",[r7]],["Pad",[sS]],["Pow",[iI]],["QuickGelu",[ib,r0]],["Range",[sH]],["Reciprocal",[ie]],["ReduceMin",[rw]],["ReduceMean",[rg]],["ReduceMax",[r$]],["ReduceSum",[rx]],["ReduceProd",[rv]],["ReduceL1",[ry]],["ReduceL2",[r_]],["ReduceLogSum",[rT]],["ReduceLogSumExp",[rb]],["ReduceSumSquare",[rS]],["Relu",[it]],["Resize",[s0,s1]],["RotaryEmbedding",[su]],["ScatterND",[sQ,sZ]],["Sigmoid",[ir]],["Sin",[is]],["Sinh",[io]],["Slice",[s5,s7]],["SkipLayerNormalization",[s3]],["Split",[sa,ss]],["Sqrt",[iu]],["Softmax",[ne,nt]],["Sub",[iC]],["Tan",[il]],["Tanh",[ip]],["ThresholdedRelu",[ig,r0]],["Tile",[na]],["Transpose",[t1,t2]],["Where",[nn]]])}),np=l(()=>{ed(),e8(),tY(),nd=class{constructor(t){this.backend=t,this.repo=new Map,this.attributesBound=!1}getArtifact(t){return this.repo.get(t)}setArtifact(t,r){this.repo.set(t,r)}run(t,r,i,a,s){Q(t.programInfo.name);let n=this.backend.device,o=this.backend.getComputePassEncoder();this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber);let u=[];for(let t of r)u.push({binding:u.length,resource:{buffer:t.buffer}});for(let t of i)u.push({binding:u.length,resource:{buffer:t.buffer}});s&&u.push({binding:u.length,resource:s});let l=n.createBindGroup({layout:t.computePipeline.getBindGroupLayout(0),entries:u,label:t.programInfo.name});if("capturing"===this.backend.sessionStatus){let r={kernelId:this.backend.currentKernelId,computePipeline:t.computePipeline,bindGroup:l,dispatchGroup:a};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(r)}o.setPipeline(t.computePipeline),o.setBindGroup(0,l),o.dispatchWorkgroups(...a),this.backend.writeTimestamp(2*this.backend.pendingDispatchNumber+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||"at-passes"===this.backend.queryType)&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),X(t.programInfo.name)}dispose(){}build(t,r){Q(t.name);let i=this.backend.device,a=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(t=>{i.features.has(t.feature)&&a.push(`enable ${t.extension};`)});let s=tX(r,this.backend.device.limits),n=t.getShaderSource(s),o=`${a.join(`
`)}
${s.additionalImplementations}
${n}`,u=i.createShaderModule({code:o,label:t.name});e6("verbose",()=>`[WebGPU] ${t.name} shader code: ${o}`);let l=i.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:t.name});return X(t.name),{programInfo:t,computePipeline:l,uniformVariablesInfo:s.variablesInfo}}normalizeDispatchGroupSize(t){let r="number"==typeof t?t:t.x,i="number"==typeof t?1:t.y||1,a="number"==typeof t?1:t.z||1,s=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(r<=s&&i<=s&&a<=s)return[r,i,a];let n=r*i*a,o=Math.ceil(Math.sqrt(n));if(!(o>s))return[o,o,1];if((o=Math.ceil(Math.cbrt(n)))>s)throw Error("Total dispatch size exceeds WebGPU maximum.");return[o,o,o]}}}),d(nc={},{WebGpuBackend:()=>nf}),nm=l(()=>{ed(),eY(),e8(),tn(),tA(),nl(),np(),nh=class{constructor(t){t&&(this.architecture=t.architecture,this.vendor=t.vendor)}isArchitecture(t){return this.architecture===t}isVendor(t){return this.vendor===t}},nf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(null===this.currentKernelId)throw Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let t=this.kernelCustomData.get(this.currentKernelId);return t||(t={},this.kernelCustomData.set(this.currentKernelId,t)),t}async initialize(t,r){this.env=t;let i=[],a={requiredLimits:{maxComputeWorkgroupStorageSize:r.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:r.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:r.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:r.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:r.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:r.limits.maxComputeWorkgroupSizeZ},requiredFeatures:i},s=t=>r.features.has(t)&&i.push(t)&&!0;s("chromium-experimental-timestamp-query-inside-passes")||s("timestamp-query"),s("shader-f16"),s("subgroups"),this.device=await r.requestDevice(a),this.adapterInfo=new nh(r.info||await r.requestAdapterInfo()),this.gpuDataManager=tz(this),this.programManager=new nd(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,e4(t.logLevel,!!t.debug),this.device.onuncapturederror=t=>{t.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${t.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!0}),Object.defineProperty(this.env.webgpu,"adapter",{value:r,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){"u">typeof this.querySet&&this.querySet.destroy(),this.gpuDataManager.dispose(),this.device&&this.env?.webgpu&&this.device.lost.then(()=>{delete this.env.webgpu.device})}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let t=this.getCommandEncoder(),r={};"at-passes"===this.queryType&&(r.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:2*this.pendingDispatchNumber,endOfPassWriteIndex:2*this.pendingDispatchNumber+1}),this.computePassEncoder=t.beginComputePass(r)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){let t;this.commandEncoder&&(Q(),this.endComputePass(),"none"!==this.queryType&&(this.commandEncoder.resolveQuerySet(this.querySet,0,2*this.pendingDispatchNumber,this.queryResolveBuffer,0),t=this.device.createBuffer({size:2*this.pendingDispatchNumber*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(t,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,t,0,2*this.pendingDispatchNumber*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,"none"!==this.queryType&&t.mapAsync(GPUMapMode.READ).then(()=>{let r=new BigUint64Array(t.getMappedRange()),i=this.pendingQueries.get(t);for(let t=0;t<r.length/2;t++){let a=i[t],s=a.kernelId,n=this.kernels.get(s),o=n.kernelType,u=n.kernelName,l=a.programName,d=a.inputTensorViews,p=a.outputTensorViews,c=r[2*t],h=r[2*t+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=c);let f=Number(c-this.queryTimeBase),m=Number(h-this.queryTimeBase);if(!Number.isSafeInteger(f)||!Number.isSafeInteger(m))throw RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:d.map(t=>({dims:t.dims,dataType:eG(t.dataType)})),outputsMetadata:p.map(t=>({dims:t.dims,dataType:eG(t.dataType)})),kernelId:s,kernelType:o,kernelName:u,programName:l,startTime:f,endTime:m});else{let t="";d.forEach((r,i)=>{t+=`input[${i}]: [${r.dims}] | ${eG(r.dataType)}, `});let r="";p.forEach((t,i)=>{r+=`output[${i}]: [${t.dims}] | ${eG(t.dataType)}, `}),console.log(`[profiling] kernel "${s}|${o}|${u}|${l}" ${t}${r}start time: ${f} ns, execution time: ${m-f} ns`)}K("GPU",`${l}::${c}::${h}`)}t.unmap(),this.pendingQueries.delete(t)}),X())}run(t,r,i,a,s,n){var o,u,l;let d,p;Q(t.name);let c=[];for(let t=0;t<r.length;++t){let i=r[t].data;if(0===i)continue;let a=this.gpuDataManager.get(i);if(!a)throw Error(`no GPU data for input: ${i}`);c.push(a)}let{outputs:h,dispatchGroup:f,programUniforms:m}=t.getRunData(r),g=0===i.length?h.map((t,r)=>r):i;if(g.length!==h.length)throw Error(`Output size ${g.length} must be equal to ${h.length}.`);let y=[],_=[];for(let t=0;t<h.length;++t){if(!Number.isInteger(g[t])||g[t]<-3||g[t]>=n)throw Error(`Invalid output index: ${g[t]}`);if(-3===g[t])continue;let r=-1===g[t],i=-2===g[t],o=r||i?s(h[t].dataType,h[t].dims):a(g[t],h[t].dataType,h[t].dims);if(y.push(o),0===o.data)continue;let u=this.gpuDataManager.get(o.data);if(!u)throw Error(`no GPU data for output: ${o.data}`);if(r&&this.temporaryData.push(u),i){let t=this.kernelPersistentData.get(this.currentKernelId);t||(t=[],this.kernelPersistentData.set(this.currentKernelId,t)),t.push(u)}_.push(u)}if(c.length!==r.length||_.length!==y.length){if(0===_.length)return X(t.name),y;throw Error(`Program ${t.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}if(m){let t=0,r=[];m.forEach(i=>{let a="number"==typeof i.data?[i.data]:i.data;if(0===a.length)return;let s=10===i.type?2:4,n,o;10===i.type?(o=a.length>4?16:a.length>2?8:a.length*s,n=a.length>4?16:s*a.length):(o=a.length<=2?a.length*s:16,n=16),t=Math.ceil(t/o)*o,r.push(t);let u=10===i.type?8:4;t+=a.length>4?Math.ceil(a.length/u)*n:a.length*s});let i=new ArrayBuffer(t=16*Math.ceil(t/16));m.forEach((t,a)=>{let s=r[a],n="number"==typeof t.data?[t.data]:t.data;if(6===t.type)new Int32Array(i,s,n.length).set(n);else if(12===t.type)new Uint32Array(i,s,n.length).set(n);else if(10===t.type)new Uint16Array(i,s,n.length).set(n);else if(1===t.type)new Float32Array(i,s,n.length).set(n);else throw Error(`Unsupported uniform type: ${eG(t.type)}`)});let a=this.gpuDataManager.create(t,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(a.buffer,0,i,0,t),this.gpuDataManager.release(a.id),d={offset:0,size:t,buffer:a.buffer}}let b=this.programManager.normalizeDispatchGroupSize(f),$=(o=t,u=r,l=1===b[1]&&1===b[2],p=o.name,o.shaderCache?.hint&&(p+="["+o.shaderCache.hint+"]"),p+=":"+l+`:${((t,r)=>{if(r.length!==t.length)throw Error(`inputDependencies length ${r.length} is not equal to inputTensors length ${t.length}.`);let i=[];for(let a=0;a<t.length;++a){let s=t[a].dataType;switch(r[a]){case"none":i.push("");break;case"type":i.push(`${s}`);break;case"rank":{let r=t[a].dims.length;i.push(`${s};${r}`);break}case"dims":{let r=t[a].dims.join(",");i.push(`${s};${r}`);break}default:throw Error(`unsupported input dependency: ${r[a]}`)}}return i.join("|")})(u,o.shaderCache?.inputDependencies??Array(u.length).fill("dims"))}`),w=this.programManager.getArtifact($);if(w||(w=this.programManager.build(t,b),this.programManager.setArtifact($,w),e6("info",()=>`[artifact] key: ${$}, programName: ${t.name}`)),m&&w.uniformVariablesInfo){if(m.length!==w.uniformVariablesInfo.length)throw Error(`Uniform variables count mismatch: expect ${w.uniformVariablesInfo.length}, got ${m.length} in program "${w.programInfo.name}".`);for(let t=0;t<m.length;t++){let r=m[t],i=r.type,a="number"==typeof r.data?1:r.data.length,[s,n]=w.uniformVariablesInfo[t];if(i!==s||a!==n)throw Error(`Uniform variable ${t} mismatch: expect type ${s} with size ${n}, got type ${i} with size ${a} in program "${w.programInfo.name}".`)}}if(e6("info",()=>`[ProgramManager] run "${t.name}" (key=${$}) with ${b[0]}x${b[1]}x${b[2]}`),"none"!==this.queryType||"capturing"===this.sessionStatus){let t={kernelId:this.currentKernelId,programName:w.programInfo.name,inputTensorViews:r,outputTensorViews:y};this.pendingKernels.push(t),"capturing"===this.sessionStatus&&this.capturedPendingKernels.get(this.currentSessionId).push(t)}return this.programManager.run(w,c,_,b,d),X(t.name),y}upload(t,r){this.gpuDataManager.upload(t,r)}memcpy(t,r){this.gpuDataManager.memcpy(t,r)}async download(t,r){await this.gpuDataManager.download(t,r)}alloc(t){return this.gpuDataManager.create(t).id}free(t){return this.gpuDataManager.release(t)}createKernel(t,r,i,a){let s=nu.get(t);if(!s)throw Error(`kernel not implemented: ${t}`);let n={kernelType:t,kernelName:a,kernelEntry:s[0],attributes:[s[1],i]};this.kernels.set(r,n)}releaseKernel(t){let r=this.kernelPersistentData.get(t);if(r){for(let t of r)this.gpuDataManager.release(t.id);this.kernelPersistentData.delete(t)}this.kernelCustomData.delete(t),this.kernels.delete(t)}computeKernel(t,r,i){let a=this.kernels.get(t);if(!a)throw Error(`kernel not created: ${t}`);let s=a.kernelType,n=a.kernelName,o=a.kernelEntry,u=a.attributes;if(null!==this.currentKernelId)throw Error(`kernel "[${s}] ${n}" is not allowed to be called recursively`);this.currentKernelId=t,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),e6("info",()=>`[WebGPU] Start to run kernel "[${s}] ${n}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),o(r,u[1]),0}catch(t){return i.push(Promise.resolve(`[WebGPU] Kernel "[${s}] ${n}" failed. ${t}`)),1}finally{for(let t of(l&&i.push(this.device.popErrorScope().then(t=>t?`GPU validation error for kernel "[${s}] ${n}": ${t.message}`:null)),this.temporaryData))this.gpuDataManager.release(t.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(t,r,i,a){let s=this.sessionExternalDataMapping.get(t);s||(s=new Map,this.sessionExternalDataMapping.set(t,s));let n=s.get(r),o=this.gpuDataManager.registerExternalBuffer(i,a,n);return s.set(r,[o,i]),o}unregisterBuffers(t){let r=this.sessionExternalDataMapping.get(t);r&&(r.forEach(t=>this.gpuDataManager.unregisterExternalBuffer(t[0])),this.sessionExternalDataMapping.delete(t))}getBuffer(t){let r=this.gpuDataManager.get(t);if(!r)throw Error(`no GPU data for buffer: ${t}`);return r.buffer}createDownloader(t,r,i){return async()=>{let a=await tI(this,t,r);return ts(a.buffer,i)}}writeTimestamp(t){"inside-passes"===this.queryType&&this.computePassEncoder.writeTimestamp(this.querySet,t)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),"none"!==this.queryType&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:2*this.maxDispatchNumber}),this.queryResolveBuffer=this.device.createBuffer({size:2*this.maxDispatchNumber*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){e6("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){e6("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){e6("info","replay"),this.sessionStatus="replaying";let t=this.capturedCommandList.get(this.currentSessionId),r=this.capturedPendingKernels.get(this.currentSessionId),i=t.length;this.pendingKernels=[];for(let a=0;a<i;a++){let i=this.getComputePassEncoder(),s=t[a];this.writeTimestamp(2*this.pendingDispatchNumber),i.setPipeline(s.computePipeline),i.setBindGroup(0,s.bindGroup),i.dispatchWorkgroups(...s.dispatchGroup),this.writeTimestamp(2*this.pendingDispatchNumber+1),this.pendingDispatchNumber++,"none"!==this.queryType&&this.pendingKernels.push(r[a]),(this.pendingDispatchNumber>=this.maxDispatchNumber||"at-passes"===this.queryType)&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(t){this.unregisterBuffers(t),this.capturedCommandList.has(t)&&this.capturedCommandList.delete(t),this.capturedPendingKernels.has(t)&&this.capturedPendingKernels.delete(t),this.gpuDataManager.onReleaseSession(t)}onRunStart(t){this.currentSessionId=t,this.setQueryType()}}}),d(ng={},{init:()=>nb}),n$=l(()=>{eY(),e8(),ta(),tw(),ny=class t{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(1!==this.dataType)throw Error("Invalid data type");let t=e9.size(this.dims);return 0===t?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(7!==this.dataType)throw Error("Invalid data type");let t=e9.size(this.dims);return 0===t?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(6!==this.dataType)throw Error("Invalid data type");let t=e9.size(this.dims);return 0===t?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(10!==this.dataType&&4!==this.dataType)throw Error("Invalid data type");let t=e9.size(this.dims);return 0===t?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(r){if(e9.size(r)!==e9.size(this.dims))throw Error("Invalid new shape");return new t(this.module,this.dataType,this.data,r)}},n_=class{constructor(t,r,i){this.module=t,this.backend=r,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=r.adapterInfo;let a=t.PTR_SIZE,s=i/t.PTR_SIZE,n=4===a?"i32":"i64";this.opKernelContext=Number(t.getValue(a*s++,n));let o=Number(t.getValue(a*s++,n));this.outputCount=Number(t.getValue(a*s++,n)),this.customDataOffset=Number(t.getValue(a*s++,"*")),this.customDataSize=Number(t.getValue(a*s++,n));let u=[];for(let r=0;r<o;r++){let r=Number(t.getValue(a*s++,n)),i=Number(t.getValue(a*s++,"*")),o=Number(t.getValue(a*s++,n)),l=[];for(let r=0;r<o;r++)l.push(Number(t.getValue(a*s++,n)));u.push(new ny(t,r,i,l))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(t,r){let i=r?.inputs?.map(t=>"number"==typeof t?this.inputs[t]:t)??this.inputs,a=r?.outputs??[],s=(t,r,i)=>new ny(this.module,r,this.output(t,i),i),n=(t,r)=>{let i=ej(t,r);if(!i)throw Error(`Unsupported data type: ${t}`);let a=i>0?this.backend.gpuDataManager.create(i).id:0;return new ny(this.module,t,a,r)};return this.backend.run(t,i,a,s,n,this.outputCount)}output(t,r){let i=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=4===i?"i32":"i64",s=this.module.stackAlloc((1+r.length)*i);this.module.setValue(s,r.length,a);for(let t=0;t<r.length;t++)this.module.setValue(s+i*(t+1),r[t],a);return this.module._JsepOutput(this.opKernelContext,t,s)}catch(i){throw Error(`Failed to generate kernel's output[${t}] with dims [${r}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(i)}}},nb=async(t,r,i,a)=>{let s=r.jsepInit;if(!s)throw Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if("webgpu"===t){let t=new(nm(),p(nc)).WebGpuBackend;await t.initialize(i,a),s("webgpu",[t,r=>t.alloc(Number(r)),r=>t.free(r),(i,a,s,n=!1)=>{if(n)e6("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(i)}, dst=${Number(a)}, size=${Number(s)}`),t.memcpy(Number(i),Number(a));else{e6("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(i)}, gpuDataId=${Number(a)}, size=${Number(s)}`);let n=r.HEAPU8.subarray(Number(i>>>0),Number(i>>>0)+Number(s));t.upload(Number(a),n)}},async(i,a,s)=>{e6("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${i}, dataOffset=${a}, size=${s}`),await t.download(Number(i),()=>r.HEAPU8.subarray(Number(a)>>>0,Number(a+s)>>>0))},(i,a,s)=>t.createKernel(i,Number(a),s,r.UTF8ToString(r._JsepGetNodeName(Number(a)))),r=>t.releaseKernel(r),(i,a,s,n)=>{e6("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${s}, kernel=${i}, contextDataOffset=${a}`);let o=new n_(r,t,Number(a));return t.computeKernel(Number(i),o,n)},()=>t.captureBegin(),()=>t.captureEnd(),()=>t.replay()])}else{let t=new t$(i);s("webnn",[t,()=>t.reserveTensorId(),r=>t.releaseTensorId(r),async(r,i,a,s,n)=>t.ensureTensor(r,i,a,s,n),(r,i)=>{t.uploadTensor(r,i)},async(r,i)=>t.downloadTensor(r,i),(r,i)=>t.registerMLContext(r,i),!!i.trace])}}}),nO=l(()=>{ed(),eN(),eF(),eY(),eR(),eP(),e0(),nw=async t=>{var r,i;r=t.wasm.numThreads,i=eK(t.logLevel),0!==eO()._OrtInit(r,i)&&eD("Can't initialize onnxruntime.")},nv=async(t,r)=>{eO().asyncInit?.();let i=t.webgpu.adapter;if("webgpu"===r){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(i){if("object"!=typeof i.limits||"object"!=typeof i.features||"function"!=typeof i.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=t.webgpu.powerPreference;if(void 0!==r&&"low-power"!==r&&"high-performance"!==r)throw Error(`Invalid powerPreference setting: "${r}"`);let a=t.webgpu.forceFallbackAdapter;if(void 0!==a&&"boolean"!=typeof a)throw Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(!(i=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:a})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===r&&(typeof navigator>"u"||!navigator.ml))throw Error("WebNN is not supported in current environment");{let a=(n$(),p(ng)).init;"webgpu"===r&&await a("webgpu",eO(),t,i),"webnn"===r&&await a("webnn",eO(),t)}},nx=new Map,nS=(t,r)=>{let i=eO(),a=i.stackSave(),s=0;try{let a=i.PTR_SIZE,n=i.stackAlloc(2*a);0!==i._OrtGetInputOutputMetadata(t,r,n,n+a)&&eD("Can't get session input/output metadata.");let o=Number(i.getValue(n,"*"));s=Number(i.getValue(n+a,"*"));let u=i.HEAP32[s/4];if(0===u)return[o,0];let l=i.HEAPU32[s/4+1],d=[];for(let t=0;t<l;t++){let r=Number(i.getValue(s+8+t*a,"*"));d.push(0!==r?i.UTF8ToString(r):Number(i.getValue(s+8+(t+l)*a,"*")))}return[o,u,d]}finally{i.stackRestore(a),0!==s&&i._OrtFree(s)}},nT=t=>{let r=eO(),i=r._malloc(t.byteLength);if(0===i)throw Error(`Can't create a session. failed to allocate a buffer of size ${t.byteLength}.`);return r.HEAPU8.set(t,i),[i,t.byteLength]},nE=async(t,r)=>{let i,a,s=eO();Array.isArray(t)?[i,a]=t:t.buffer===s.HEAPU8.buffer?[i,a]=[t.byteOffset,t.byteLength]:[i,a]=nT(t);let n=0,o=0,u=0,l=[],d=[],p=[];try{if([o,l]=await eq(r),r?.externalData&&s.mountExternalData){let t=[];for(let i of r.externalData){let r="string"==typeof i?i:i.path;t.push(eJ("string"==typeof i?i:i.data).then(t=>{s.mountExternalData(r,t)}))}await Promise.all(t)}for(let t of r?.executionProviders??[])if(("string"==typeof t?t:t.name)==="webnn"){if(s.shouldTransferToMLTensor=!1,"string"!=typeof t){let r=t?.context,i=t?.gpuDevice,a=t?.deviceType,n=t?.powerPreference;r?s.currentContext=r:i?s.currentContext=await s.webnnCreateMLContext(i):s.currentContext=await s.webnnCreateMLContext({deviceType:a,powerPreference:n})}else s.currentContext=await s.webnnCreateMLContext();break}n=await s._OrtCreateSession(i,a,o),s.webgpuOnCreateSession?.(n),0===n&&eD("Can't create a session."),s.jsepOnCreateSession?.(),s.currentContext&&(s.webnnRegisterMLContext(n,s.currentContext),s.currentContext=void 0,s.shouldTransferToMLTensor=!0);let[t,c]=(t=>{let r=eO(),i=r.stackSave();try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);0!==r._OrtGetInputOutputCount(t,a,a+i)&&eD("Can't get session input/output count.");let s=4===i?"i32":"i64";return[Number(r.getValue(a,s)),Number(r.getValue(a+i,s))]}finally{r.stackRestore(i)}})(n),h=!!r?.enableGraphCapture,f=[],m=[],g=[],y=[],_=[];for(let r=0;r<t;r++){let[t,i,a]=nS(n,r);0===t&&eD("Can't get an input name."),d.push(t);let o=s.UTF8ToString(t);f.push(o),g.push(0===i?{name:o,isTensor:!1}:{name:o,isTensor:!0,type:eG(i),shape:a})}for(let i=0;i<c;i++){let[a,o,u]=nS(n,i+t);0===a&&eD("Can't get an output name."),p.push(a);let l=s.UTF8ToString(a);m.push(l),y.push(0===o?{name:l,isTensor:!1}:{name:l,isTensor:!0,type:eG(o),shape:u});{if(h&&r?.preferredOutputLocation===void 0){_.push("gpu-buffer");continue}let t="string"==typeof r?.preferredOutputLocation?r.preferredOutputLocation:r?.preferredOutputLocation?.[l]??"cpu",i=s.webnnIsGraphOutput;if("cpu"===t&&i&&i(n,l)){_.push("ml-tensor-cpu-output");continue}if("cpu"!==t&&"cpu-pinned"!==t&&"gpu-buffer"!==t&&"ml-tensor"!==t)throw Error(`Not supported preferred output location: ${t}.`);if(h&&"gpu-buffer"!==t)throw Error(`Not supported preferred output location: ${t}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);_.push(t)}}let b=null;return _.some(t=>"gpu-buffer"===t||"ml-tensor"===t||"ml-tensor-cpu-output"===t)&&(u=s._OrtCreateBinding(n),0===u&&eD("Can't create IO binding."),b={handle:u,outputPreferredLocations:_,outputPreferredLocationsEncoded:_.map(t=>"ml-tensor-cpu-output"===t?"ml-tensor":t).map(t=>eX(t))}),nx.set(n,[n,d,p,b,h,!1]),[n,f,m,g,y]}catch(t){throw d.forEach(t=>s._OrtFree(t)),p.forEach(t=>s._OrtFree(t)),0!==u&&0!==s._OrtReleaseBinding(u)&&eD("Can't release IO binding."),0!==n&&0!==s._OrtReleaseSession(n)&&eD("Can't release session."),t}finally{s._free(i),0!==o&&0!==s._OrtReleaseSessionOptions(o)&&eD("Can't release session options."),l.forEach(t=>s._free(t)),s.unmountExternalData?.()}},nk=t=>{let r=eO(),i=nx.get(t);if(!i)throw Error(`cannot release session. invalid session id: ${t}`);let[a,s,n,o,u]=i;o&&(u&&0!==r._OrtClearBoundOutputs(o.handle)&&eD("Can't clear bound outputs."),0!==r._OrtReleaseBinding(o.handle)&&eD("Can't release IO binding.")),r.jsepOnReleaseSession?.(t),r.webnnOnReleaseSession?.(t),r.webgpuOnReleaseSession?.(t),s.forEach(t=>r._OrtFree(t)),n.forEach(t=>r._OrtFree(t)),0!==r._OrtReleaseSession(a)&&eD("Can't release session."),nx.delete(t)},nI=async(t,r,i,a,s,n,o=!1)=>{if(!t)return void r.push(0);let u=eO(),l=u.PTR_SIZE,d=t[0],p=t[1],c=t[3],h=c,f,m;if("string"===d&&("gpu-buffer"===c||"ml-tensor"===c))throw Error("String tensor is not supported on GPU.");if(o&&"gpu-buffer"!==c)throw Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if("gpu-buffer"===c){let r=t[2].gpuBuffer;m=ej(eW(d),p);{let t=u.jsepRegisterBuffer;if(!t)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=t(a,n,r,m)}}else if("ml-tensor"===c){let r=t[2].mlTensor;m=ej(eW(d),p);let i=u.webnnRegisterMLTensor;if(!i)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=i(a,r,eW(d),p)}else{let r=t[2];if(Array.isArray(r)){m=l*r.length,f=u._malloc(m),i.push(f);for(let t=0;t<r.length;t++){if("string"!=typeof r[t])throw TypeError(`tensor data at index ${t} is not a string`);u.setValue(f+t*l,eB(r[t],i),"*")}}else{let t=u.webnnIsGraphInput,n=u.webnnIsGraphOutput;if("string"!==d&&t&&n){let o=u.UTF8ToString(s);if(t(a,o)||n(a,o)){let t=eW(d);m=ej(t,p),h="ml-tensor";let i=u.webnnCreateTemporaryTensor,s=u.webnnUploadTensor;if(!i||!s)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let n=await i(a,t,p);s(n,new Uint8Array(r.buffer,r.byteOffset,r.byteLength)),f=n}else m=r.byteLength,f=u._malloc(m),i.push(f),u.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,m),f)}else m=r.byteLength,f=u._malloc(m),i.push(f),u.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,m),f)}}let g=u.stackSave(),y=u.stackAlloc(4*p.length);try{p.forEach((t,r)=>u.setValue(y+r*l,t,4===l?"i32":"i64"));let t=u._OrtCreateTensor(eW(d),f,m,y,p.length,eX(h));0===t&&eD(`Can't create tensor for input/output. session=${a}, index=${n}.`),r.push(t)}finally{u.stackRestore(g)}},nC=async(t,r,i,a,s,n)=>{let o=eO(),u=o.PTR_SIZE,l=nx.get(t);if(!l)throw Error(`cannot run inference. invalid session id: ${t}`);let d=l[0],p=l[1],c=l[2],h=l[3],f=l[4],m=l[5],g=r.length,y=a.length,_=0,b=[],$=[],w=[],v=[],x=[],S=o.stackSave(),T=o.stackAlloc(g*u),E=o.stackAlloc(g*u),k=o.stackAlloc(y*u),I=o.stackAlloc(y*u);try{let l;[_,b]=eU(n),Y("wasm prepareInputOutputTensor");for(let a=0;a<g;a++)await nI(i[a],$,v,t,p[r[a]],r[a],f);for(let r=0;r<y;r++)await nI(s[r],w,v,t,c[a[r]],g+a[r],f);J("wasm prepareInputOutputTensor");for(let t=0;t<g;t++)o.setValue(T+t*u,$[t],"*"),o.setValue(E+t*u,p[r[t]],"*");for(let t=0;t<y;t++)o.setValue(k+t*u,w[t],"*"),o.setValue(I+t*u,c[a[t]],"*");if(h&&!m){let{handle:i,outputPreferredLocations:n,outputPreferredLocationsEncoded:u}=h;if(p.length!==g)throw Error(`input count from feeds (${g}) is expected to be always equal to model's input count (${p.length}).`);Y("wasm bindInputsOutputs");for(let a=0;a<g;a++){let s=r[a];await o._OrtBindInput(i,p[s],$[a])!==0&&eD(`Can't bind input[${a}] for session=${t}.`)}for(let r=0;r<y;r++){let l=a[r];s[r]?.[3]?(x.push(w[r]),0!==o._OrtBindOutput(i,c[l],w[r],0)&&eD(`Can't bind pre-allocated output[${r}] for session=${t}.`)):0!==o._OrtBindOutput(i,c[l],0,u[l])&&eD(`Can't bind output[${r}] to ${n[r]} for session=${t}.`)}J("wasm bindInputsOutputs"),nx.set(t,[d,p,c,h,f,!0])}o.jsepOnRunStart?.(d),o.webnnOnRunStart?.(d),l=h?await o._OrtRunWithBinding(d,h.handle,y,k,_):await o._OrtRun(d,E,T,g,I,y,k,_),0!==l&&eD("failed to call OrtRun().");let S=[],C=[];Y("wasm ProcessOutputTensor");for(let r=0;r<y;r++){let i=Number(o.getValue(k+r*u,"*"));if(i===w[r]||x.includes(w[r])){S.push(s[r]),i!==w[r]&&0!==o._OrtReleaseTensor(i)&&eD("Can't release tensor.");continue}let n=o.stackSave(),l=o.stackAlloc(4*u),d=!1,p,c=0;try{0!==o._OrtGetTensorData(i,l,l+u,l+2*u,l+3*u)&&eD(`Can't access output tensor data on index ${r}.`);let s=4===u?"i32":"i64",n=Number(o.getValue(l,s));c=o.getValue(l+u,"*");let f=o.getValue(l+2*u,"*"),m=Number(o.getValue(l+3*u,s)),g=[];for(let t=0;t<m;t++)g.push(Number(o.getValue(f+t*u,s)));0!==o._OrtFree(f)&&eD("Can't free memory for tensor dims.");let y=g.reduce((t,r)=>t*r,1);p=eG(n);let _=h?.outputPreferredLocations[a[r]];if("string"===p){if("gpu-buffer"===_||"ml-tensor"===_)throw Error("String tensor is not supported on GPU.");let t=[];for(let r=0;r<y;r++){let i=o.getValue(c+r*u,"*"),a=o.getValue(c+(r+1)*u,"*"),s=r===y-1?void 0:a-i;t.push(o.UTF8ToString(i,s))}S.push([p,g,t,"cpu"])}else if("gpu-buffer"===_&&y>0){let t=o.jsepGetBuffer;if(!t)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let r=t(c),a=ej(n,y);if(void 0===a||!eZ(p))throw Error(`Unsupported data type: ${p}`);d=!0,S.push([p,g,{gpuBuffer:r,download:o.jsepCreateDownloader(r,a,p),dispose:()=>{0!==o._OrtReleaseTensor(i)&&eD("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===_&&y>0){let r=o.webnnEnsureTensor,a=o.webnnIsGraphInputOutputTypeSupported;if(!r||!a)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===ej(n,y)||!eQ(p))throw Error(`Unsupported data type: ${p}`);if(!a(t,p,!1))throw Error(`preferredLocation "ml-tensor" for ${p} output is not supported by current WebNN Context.`);let s=await r(t,c,n,g,!1);d=!0,S.push([p,g,{mlTensor:s,download:o.webnnCreateMLTensorDownloader(c,p),dispose:()=>{o.webnnReleaseTensorId(c),o._OrtReleaseTensor(i)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===_&&y>0){let t=o.webnnCreateMLTensorDownloader(c,p)(),r=S.length;d=!0,C.push((async()=>{let a=[r,await t];return o.webnnReleaseTensorId(c),o._OrtReleaseTensor(i),a})()),S.push([p,g,[],"cpu"])}else{let t=new(eH(p))(y);new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(o.HEAPU8.subarray(c,c+t.byteLength)),S.push([p,g,t,"cpu"])}}finally{o.stackRestore(n),"string"===p&&c&&o._free(c),d||o._OrtReleaseTensor(i)}}for(let[r,i]of(h&&!f&&(0!==o._OrtClearBoundOutputs(h.handle)&&eD("Can't clear bound outputs."),nx.set(t,[d,p,c,h,f,!1])),await Promise.all(C)))S[r][2]=i;return J("wasm ProcessOutputTensor"),S}finally{o.webnnOnRunEnd?.(d),o.stackRestore(S),$.forEach(t=>o._OrtReleaseTensor(t)),w.forEach(t=>o._OrtReleaseTensor(t)),v.forEach(t=>o._free(t)),0!==_&&o._OrtReleaseRunOptions(_),b.forEach(t=>o._free(t))}},nz=t=>{let r=eO(),i=nx.get(t);if(!i)throw Error("invalid session id");let a=i[0],s=r._OrtEndProfiling(a);0===s&&eD("Can't get an profile file name."),r._OrtFree(s)},nA=t=>{let r=[];for(let i of t){let t=i[2];!Array.isArray(t)&&"buffer"in t&&r.push(t.buffer)}return r}}),nX=l(()=>{ed(),nO(),eR(),eE(),nR=()=>!!S.wasm.proxy&&"u">typeof document,nM=!1,nD=!1,nP=!1,nL=new Map,nV=(t,r)=>{let i=nL.get(t);i?i.push(r):nL.set(t,[r])},nq=()=>{if(nM||!nD||nP||!nB)throw Error("worker not ready")},nF=t=>{switch(t.data.type){case"init-wasm":nM=!1,t.data.err?(nP=!0,nN[1](t.data.err)):(nD=!0,nN[0]()),nU&&(URL.revokeObjectURL(nU),nU=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let r=nL.get(t.data.type);t.data.err?r.shift()[1](t.data.err):r.shift()[0](t.data.out)}}},nW=async()=>{if(!nD){if(nM)throw Error("multiple calls to 'initWasm()' detected.");if(nP)throw Error("previous call to 'initWasm()' failed.");if(nM=!0,nR())return new Promise((t,r)=>{nB?.terminate(),ex().then(([i,a])=>{try{(nB=a).onerror=t=>r(t),nB.onmessage=nF,nN=[t,r];let s={type:"init-wasm",in:S};if(!s.in.wasm.wasmPaths&&i){let t=e_();t&&(s.in.wasm.wasmPaths=t)}nB.postMessage(s),nU=i}catch(t){r(t)}},r)});try{await eA(S.wasm),await nw(S),nD=!0}catch(t){throw nP=!0,t}finally{nM=!1}}},nG=async t=>{if(nR())return nq(),new Promise((r,i)=>{nV("init-ep",[r,i]);let a={type:"init-ep",in:{epName:t,env:S}};nB.postMessage(a)});await nv(S,t)},nj=async t=>nR()?(nq(),new Promise((r,i)=>{nV("copy-from",[r,i]),nB.postMessage({type:"copy-from",in:{buffer:t}},[t.buffer])})):nT(t),nH=async(t,r)=>{if(!nR())return nE(t,r);if(r?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return nq(),new Promise((i,a)=>{nV("create",[i,a]);let s={type:"create",in:{model:t,options:{...r}}},n=[];t instanceof Uint8Array&&n.push(t.buffer),nB.postMessage(s,n)})},nK=async t=>{if(nR())return nq(),new Promise((r,i)=>{nV("release",[r,i]),nB.postMessage({type:"release",in:t})});nk(t)},nZ=async(t,r,i,a,s,n)=>{if(!nR())return nC(t,r,i,a,s,n);if(i.some(t=>"cpu"!==t[3]))throw Error("input tensor on GPU is not supported for proxy.");if(s.some(t=>t))throw Error("pre-allocated output tensor is not supported for proxy.");return nq(),new Promise((s,o)=>{nV("run",[s,o]),nB.postMessage({type:"run",in:{sessionId:t,inputIndices:r,inputs:i,outputIndices:a,options:n}},nA(i))})},nQ=async t=>{if(nR())return nq(),new Promise((r,i)=>{nV("end-profiling",[r,i]),nB.postMessage({type:"end-profiling",in:t})});nz(t)}}),n1=l(()=>{ed(),nX(),eY(),ep(),e0(),nY=(t,r)=>{switch(t.location){case"cpu":return[t.type,t.dims,t.data,"cpu"];case"gpu-buffer":return[t.type,t.dims,{gpuBuffer:t.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[t.type,t.dims,{mlTensor:t.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${t.location} for ${r()}`)}},nJ=t=>{switch(t[3]){case"cpu":return new j(t[0],t[2],t[1]);case"gpu-buffer":{let r=t[0];if(!eZ(r))throw Error(`not supported data type: ${r} for deserializing GPU tensor`);let{gpuBuffer:i,download:a,dispose:s}=t[2];return j.fromGpuBuffer(i,{dataType:r,dims:t[1],download:a,dispose:s})}case"ml-tensor":{let r=t[0];if(!eQ(r))throw Error(`not supported data type: ${r} for deserializing MLTensor tensor`);let{mlTensor:i,download:a,dispose:s}=t[2];return j.fromMLTensor(i,{dataType:r,dims:t[1],download:a,dispose:s})}default:throw Error(`invalid data location: ${t[3]}`)}},n0=class{async fetchModelAndCopyToWasmMemory(t){return nj(await eJ(t))}async loadModel(t,r){let i;Q(),i="string"==typeof t?await this.fetchModelAndCopyToWasmMemory(t):t,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await nH(i,r),X()}async dispose(){return nK(this.sessionId)}async run(t,r,i){Q();let a=[],s=[];Object.entries(t).forEach(t=>{let r=t[0],i=t[1],n=this.inputNames.indexOf(r);if(-1===n)throw Error(`invalid input '${r}'`);a.push(i),s.push(n)});let n=[],o=[];Object.entries(r).forEach(t=>{let r=t[0],i=t[1],a=this.outputNames.indexOf(r);if(-1===a)throw Error(`invalid output '${r}'`);n.push(i),o.push(a)});let u=a.map((t,r)=>nY(t,()=>`input "${this.inputNames[s[r]]}"`)),l=n.map((t,r)=>t?nY(t,()=>`output "${this.outputNames[o[r]]}"`):null),d=await nZ(this.sessionId,s,u,o,l,i),p={};for(let t=0;t<d.length;t++)p[this.outputNames[o[t]]]=n[t]??nJ(d[t]);return X(),p}startProfiling(){}endProfiling(){nQ(this.sessionId)}}}),d(n2={},{OnnxruntimeWebAssemblyBackend:()=>n4,initializeFlags:()=>n3,wasmBackend:()=>n6}),n8=l(()=>{ed(),nX(),n1(),n3=()=>{("number"!=typeof S.wasm.initTimeout||S.wasm.initTimeout<0)&&(S.wasm.initTimeout=0);let t=S.wasm.simd;if("boolean"!=typeof t&&void 0!==t&&"fixed"!==t&&"relaxed"!==t&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${t}". Reset it to \`false\` and ignore SIMD feature checking.`),S.wasm.simd=!1),"boolean"!=typeof S.wasm.proxy&&(S.wasm.proxy=!1),"boolean"!=typeof S.wasm.trace&&(S.wasm.trace=!1),"number"!=typeof S.wasm.numThreads||!Number.isInteger(S.wasm.numThreads)||S.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)S.wasm.numThreads=1;else{let t=typeof navigator>"u"?u("node:os").cpus().length:navigator.hardwareConcurrency;S.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},n6=new(n4=class{async init(t){n3(),await nW(),await nG(t)}async createInferenceSessionHandler(t,r){let i=new n0;return await i.loadModel(t,r),i}})}),d(n5={},{InferenceSession:()=>ei,TRACE:()=>K,TRACE_EVENT_BEGIN:()=>Y,TRACE_EVENT_END:()=>J,TRACE_FUNC_BEGIN:()=>Q,TRACE_FUNC_END:()=>X,Tensor:()=>j,default:()=>n7,env:()=>S,registerBackend:()=>f}),ed(),ed(),ed(),n7=el,n9=(n8(),p(n2)).wasmBackend,f("webgpu",n9,5),f("webnn",n9,5),f("cpu",n9,10),f("wasm",n9,10),Object.defineProperty(S.versions,"web",{value:"1.26.0",enumerable:!0}),r.exports=p(n5)},56801,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0})},48869,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.SileroLegacy=void 0;let a=t.r(74389);class s{constructor(t,r,i,a,s){this.ortInstance=t,this._session=r,this._h=i,this._c=a,this._sr=s,this.reset_state=()=>{let t=Array(128).fill(0);this._h=new this.ortInstance.Tensor("float32",t,[2,1,64]),this._c=new this.ortInstance.Tensor("float32",t,[2,1,64])},this.process=async t=>{let r={input:new this.ortInstance.Tensor("float32",t,[1,t.length]),h:this._h,c:this._c,sr:this._sr},i=await this._session.run(r);this._h=i.hn,this._c=i.cn;let[a]=i.output?.data;return{notSpeech:1-a,isSpeech:a}},this.release=async()=>{await this._session.release(),this._h.dispose(),this._c.dispose(),this._sr.dispose()}}}i.SileroLegacy=s,s.new=async(t,r)=>{a.log.debug("initializing vad");let i=await r(),n=await t.InferenceSession.create(i),o=new t.Tensor("int64",[16000n]),u=Array(128).fill(0),l=new t.Tensor("float32",u,[2,1,64]),d=new t.Tensor("float32",u,[2,1,64]);return a.log.debug("vad is initialized"),new s(t,n,l,d,o)}},18816,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.SileroV5=void 0;let a=t.r(74389);function s(t){let r=Array(256).fill(0);return new t.Tensor("float32",r,[2,1,128])}class n{constructor(t,r,i,a){this._session=t,this._state=r,this._sr=i,this.ortInstance=a,this.reset_state=()=>{this._state=s(this.ortInstance)},this.process=async t=>{let r={input:new this.ortInstance.Tensor("float32",t,[1,t.length]),state:this._state,sr:this._sr},i=await this._session.run(r);if(!i.stateN)throw Error("No state from model");if(this._state=i.stateN,!i.output?.data)throw Error("No output from model");let a=i.output.data[0];if("number"!=typeof a)throw Error("Weird output data");return{notSpeech:1-a,isSpeech:a}},this.release=async()=>{await this._session.release(),this._state.dispose(),this._sr.dispose()}}}i.SileroV5=n,n.new=async(t,r)=>{a.log.debug("Loading VAD...");let i=await r(),o=await t.InferenceSession.create(i),u=new t.Tensor("int64",[16000n]),l=s(t);return a.log.debug("...finished loading VAD"),new n(o,l,u,t)}},57289,(t,r,i)=>{"use strict";var a=t.e&&t.e.__createBinding||(Object.create?function(t,r,i,a){void 0===a&&(a=i);var s=Object.getOwnPropertyDescriptor(r,i);(!s||("get"in s?!r.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(t,a,s)}:function(t,r,i,a){void 0===a&&(a=i),t[a]=r[i]}),s=t.e&&t.e.__exportStar||function(t,r){for(var i in t)"default"===i||Object.prototype.hasOwnProperty.call(r,i)||a(r,t,i)};Object.defineProperty(i,"__esModule",{value:!0}),i.SileroV5=i.SileroLegacy=void 0,s(t.r(56801),i);var n=t.r(48869);Object.defineProperty(i,"SileroLegacy",{enumerable:!0,get:function(){return n.SileroLegacy}});var o=t.r(18816);Object.defineProperty(i,"SileroV5",{enumerable:!0,get:function(){return o.SileroV5}})},58868,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.Resampler=void 0;let a=t.r(74389);i.Resampler=class{constructor(t){this.options=t,this.process=t=>{let r=[];for(let i of t)for(this.inputBuffer.push(i);this.hasEnoughDataForFrame();){let t=this.generateOutputFrame();r.push(t)}return r},t.nativeSampleRate<16e3&&a.log.error("nativeSampleRate is too low. Should have 16000 = targetSampleRate <= nativeSampleRate"),this.inputBuffer=[]}async *stream(t){for(let r of t)for(this.inputBuffer.push(r);this.hasEnoughDataForFrame();){let t=this.generateOutputFrame();yield t}}hasEnoughDataForFrame(){return this.inputBuffer.length*this.options.targetSampleRate/this.options.nativeSampleRate>=this.options.targetFrameSize}generateOutputFrame(){let t=new Float32Array(this.options.targetFrameSize),r=0,i=0;for(;r<this.options.targetFrameSize;){let a=0,s=0;for(;i<Math.min(this.inputBuffer.length,(r+1)*this.options.nativeSampleRate/this.options.targetSampleRate);){let t=this.inputBuffer[i];void 0!==t&&(a+=t,s++),i++}t[r]=a/s,r++}return this.inputBuffer=this.inputBuffer.slice(i),t}}},73852,(t,r,i)=>{"use strict";var a=t.e&&t.e.__createBinding||(Object.create?function(t,r,i,a){void 0===a&&(a=i);var s=Object.getOwnPropertyDescriptor(r,i);(!s||("get"in s?!r.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(t,a,s)}:function(t,r,i,a){void 0===a&&(a=i),t[a]=r[i]}),s=t.e&&t.e.__setModuleDefault||(Object.create?function(t,r){Object.defineProperty(t,"default",{enumerable:!0,value:r})}:function(t,r){t.default=r}),n=t.e&&t.e.__importStar||function(t){if(t&&t.__esModule)return t;var r={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&a(r,t,i);return s(r,t),r};Object.defineProperty(i,"__esModule",{value:!0}),i.NonRealTimeVAD=i.defaultNonRealTimeVADOptions=void 0;let o=n(t.r(74450)),u=t.r(74574),l=t.r(22237),d=t.r(43489),p=t.r(42827),c=t.r(57289),h=t.r(58868);i.defaultNonRealTimeVADOptions={...d.defaultFrameProcessorOptions,modelURL:u.baseAssetPath+"silero_vad_legacy.onnx",modelFetcher:l.defaultModelFetcher},i.NonRealTimeVAD=class{static async new(t={}){let r={...i.defaultNonRealTimeVADOptions,...t};(0,d.validateOptions)(r),void 0!==r.ortConfig&&r.ortConfig(o);let a=()=>r.modelFetcher(r.modelURL),s=await c.SileroLegacy.new(o,a),n=new d.FrameProcessor(s.process,s.reset_state,{positiveSpeechThreshold:r.positiveSpeechThreshold,negativeSpeechThreshold:r.negativeSpeechThreshold,redemptionMs:r.redemptionMs,preSpeechPadMs:r.preSpeechPadMs,minSpeechMs:r.minSpeechMs,submitUserSpeechOnPause:r.submitUserSpeechOnPause},96);return n.resume(),new this(a,o,r,n)}constructor(t,r,i,a){this.modelFetcher=t,this.ort=r,this.options=i,this.frameProcessor=a,this.frameSamples=1536}async *run(t,r){let i={nativeSampleRate:r,targetSampleRate:16e3,targetFrameSize:this.frameSamples},a=new h.Resampler(i),s=0,n=0,o=0;for await(let r of a.stream(t)){let t=[];for(let i of(await this.frameProcessor.process(r,r=>{t.push(r)}),t))switch(i.msg){case p.Message.SpeechStart:s=o*this.frameSamples/16;break;case p.Message.SpeechEnd:n=(o+1)*this.frameSamples/16,yield{audio:i.audio,start:s,end:n}}o++}let u=[];for(let t of(this.frameProcessor.endSegment(t=>{u.push(t)}),u))t.msg===p.Message.SpeechEnd&&(yield{audio:t.audio,start:s,end:o*this.frameSamples/16})}}},84407,(t,r,i)=>{"use strict";function a(t,r,i){for(let a=0;a<i.length;a++)t.setUint8(r+a,i.charCodeAt(a))}Object.defineProperty(i,"__esModule",{value:!0}),i.audioFileToArray=i.encodeWAV=i.arrayBufferToBase64=i.minFramesForTargetMS=void 0,i.minFramesForTargetMS=function(t,r,i=16e3){return Math.ceil(t*i/1e3/r)},i.arrayBufferToBase64=function(t){let r=new Uint8Array(t),i=r.byteLength,a=Array(i);for(let t=0;t<i;t++){let i=r[t];if(void 0===i)break;a[t]=String.fromCharCode(i)}return btoa(a.join(""))},i.encodeWAV=function(t,r=3,i=16e3,s=1,n=32){let o=n/8,u=s*o,l=new ArrayBuffer(44+t.length*o),d=new DataView(l);return a(d,0,"RIFF"),d.setUint32(4,36+t.length*o,!0),a(d,8,"WAVE"),a(d,12,"fmt "),d.setUint32(16,16,!0),d.setUint16(20,r,!0),d.setUint16(22,s,!0),d.setUint32(24,i,!0),d.setUint32(28,i*u,!0),d.setUint16(32,u,!0),d.setUint16(34,n,!0),a(d,36,"data"),d.setUint32(40,t.length*o,!0),1===r?function(t,r,i){for(let a=0;a<i.length;a++,r+=2){let s=Math.max(-1,Math.min(1,i[a]));t.setInt16(r,s<0?32768*s:32767*s,!0)}}(d,44,t):function(t,r,i){for(let a=0;a<i.length;a++,r+=4)t.setFloat32(r,i[a],!0)}(d,44,t),l},i.audioFileToArray=async function(t){let r=new OfflineAudioContext(1,1,44100),i=new FileReader,a=null;if(await new Promise(s=>{i.addEventListener("loadend",()=>{let t=i.result;r.decodeAudioData(t,t=>{a=t,r.startRendering().then(()=>{console.log("Rendering completed successfully"),s()}).catch(t=>{console.error("Rendering failed: ",t)})},t=>{console.log("Error with decoding audio data: ",t)})}),i.readAsArrayBuffer(t)}),null===a)throw Error("some shit");let s=a,n=new Float32Array(s.length);for(let t=0;t<s.length;t++)for(let r=0;r<s.numberOfChannels;r++){let i=s.getChannelData(r)[t],a=n[t];if(void 0===i||void 0===a)throw Error("sample or out[i] is undefined");n[t]=a+i}return{audio:n,sampleRate:s.sampleRate}}},5937,(t,r,i)=>{"use strict";var a,s,n,o,u,l,d,p,c,h,f,m,g,y,_,b,$,w,v,x,S,T,E,k,I,C,z,A,O,R,B,M,D,P,U,N,L,V,q,F,W,G,j,H,K,Z,Q,X,Y,J,ee,et,er,ei,ea,es,en,eo,eu,el,ed,ep,ec,eh,ef,em,eg,ey,e_,eb,e$,ew,ev,ex,eS,eT,eE,ek,eI,eC,ez,eA,eO,eR,eB,eM,eD,eP,eU,eN,eL,eV,eq,eF,eW,eG,ej,eH,eK,eZ,eQ,eX,eY,eJ,e0,e1,e2,e3,e4,e6,e8,e5,e7,e9,te,tt,tr,ti,ta,ts,tn,to,tu,tl,td,tp,tc,th,tf,tm,tg,ty,t_,tb,t$,tw,tv,tx,tS,tT,tE,tk,tI,tC,tz,tA,tO;let tR;a=Object.defineProperty,s=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,o=Object.prototype.hasOwnProperty,u=t.t,l=(t,r)=>()=>(t&&(r=t(t=0)),r),d=(t,r)=>{for(var i in r)a(t,i,{get:r[i],enumerable:!0})},p=t=>((t,r,i)=>{if(r&&"object"==typeof r||"function"==typeof r)for(let u of n(r))o.call(t,u)||void 0===u||a(t,u,{get:()=>r[u],enumerable:!(i=s(r,u))||i.enumerable});return t})(a({},"__esModule",{value:!0}),t),y=l(()=>{c=new Map,h=[],f=(t,r,i)=>{if(r&&"function"==typeof r.init&&"function"==typeof r.createInferenceSessionHandler){let a=c.get(t);if(void 0===a)c.set(t,{backend:r,priority:i});else{if(a.priority>i)return;if(a.priority===i&&a.backend!==r)throw Error(`cannot register backend "${t}" using priority ${i}`)}if(i>=0){let r=h.indexOf(t);-1!==r&&h.splice(r,1);for(let r=0;r<h.length;r++)if(c.get(h[r]).priority<=i)return void h.splice(r,0,t);h.push(t)}return}throw TypeError("not a valid backend")},m=async t=>{let r=c.get(t);if(!r)return"backend not found.";if(r.initialized)return r.backend;if(r.aborted)return r.error;{let i=!!r.initPromise;try{return i||(r.initPromise=r.backend.init(t)),await r.initPromise,r.initialized=!0,r.backend}catch(t){return i||(r.error=`${t}`,r.aborted=!0),r.error}finally{delete r.initPromise}}},g=async t=>{let r=t.executionProviders||[],i=r.map(t=>"string"==typeof t?t:t.name),a=0===i.length?h:i,s,n=[],o=new Set;for(let t of a){let r=await m(t);"string"==typeof r?n.push({name:t,err:r}):(s||(s=r),s===r&&o.add(t))}if(!s)throw Error(`no available backend found. ERR: ${n.map(t=>`[${t.name}] ${t.err}`).join(", ")}`);for(let{name:t,err:r}of n)i.includes(t)&&console.warn(`removing requested execution provider "${t}" from session options because it is not available: ${r}`);let u=r.filter(t=>o.has("string"==typeof t?t:t.name));return[s,new Proxy(t,{get:(t,r)=>"executionProviders"===r?u:Reflect.get(t,r)})]}}),_=l(()=>{y()}),$=l(()=>{b="1.26.0"}),x=l(()=>{$(),w="warning",Object.defineProperty(v={wasm:{},webgl:{},webgpu:{},versions:{common:b},set logLevel(e){if(void 0!==e){if("string"!=typeof e||-1===["verbose","info","warning","error","fatal"].indexOf(e))throw Error(`Unsupported logging level: ${e}`);w=e}},get logLevel(){return w}},"logLevel",{enumerable:!0})}),T=l(()=>{x(),S=v}),I=l(()=>{E=(t,r)=>{let i="u">typeof document?document.createElement("canvas"):new OffscreenCanvas(1,1);i.width=t.dims[3],i.height=t.dims[2];let a=i.getContext("2d");if(null!=a){let s,n;r?.tensorLayout!==void 0&&"NHWC"===r.tensorLayout?(s=t.dims[2],n=t.dims[3]):(s=t.dims[3],n=t.dims[2]);let o=r?.format!==void 0?r.format:"RGB",u=r?.norm,l,d;void 0===u||void 0===u.mean?l=[255,255,255,255]:"number"==typeof u.mean?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],void 0!==u.mean[3]&&(l[3]=u.mean[3])),void 0===u||void 0===u.bias?d=[0,0,0,0]:"number"==typeof u.bias?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],void 0!==u.bias[3]&&(d[3]=u.bias[3]));let p=n*s,c=0,h=p,f=2*p,m=-1;"RGBA"===o?(c=0,h=p,f=2*p,m=3*p):"RGB"===o?(c=0,h=p,f=2*p):"RBG"===o&&(c=0,f=p,h=2*p);for(let r=0;r<n;r++)for(let i=0;i<s;i++)a.fillStyle="rgba("+(t.data[c++]-d[0])*l[0]+","+(t.data[h++]-d[1])*l[1]+","+(t.data[f++]-d[2])*l[2]+","+(-1===m?255:(t.data[m++]-d[3])*l[3])+")",a.fillRect(i,r,1,1);if("toDataURL"in i)return i.toDataURL();throw Error("toDataURL is not supported")}throw Error("Can not access image data")},k=(t,r)=>{let i="u">typeof document?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),a;if(null!=i){let s,n,o;r?.tensorLayout!==void 0&&"NHWC"===r.tensorLayout?(s=t.dims[2],n=t.dims[1],o=t.dims[3]):(s=t.dims[3],n=t.dims[2],o=t.dims[1]);let u=void 0!==r&&void 0!==r.format?r.format:"RGB",l=r?.norm,d,p;void 0===l||void 0===l.mean?d=[255,255,255,255]:"number"==typeof l.mean?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],void 0!==l.mean[3]&&(d[3]=l.mean[3])),void 0===l||void 0===l.bias?p=[0,0,0,0]:"number"==typeof l.bias?p=[l.bias,l.bias,l.bias,l.bias]:(p=[l.bias[0],l.bias[1],l.bias[2],0],void 0!==l.bias[3]&&(p[3]=l.bias[3]));let c=n*s;if(void 0!==r&&(void 0!==r.format&&4===o&&"RGBA"!==r.format||3===o&&"RGB"!==r.format&&"BGR"!==r.format))throw Error("Tensor format doesn't match input tensor dims");let h=0,f=1,m=2,g=3,y=0,_=c,b=2*c,$=-1;"RGBA"===u?(y=0,_=c,b=2*c,$=3*c):"RGB"===u?(y=0,_=c,b=2*c):"RBG"===u&&(y=0,b=c,_=2*c),a=i.createImageData(s,n);for(let r=0;r<n*s;h+=4,f+=4,m+=4,g+=4,r++)a.data[h]=(t.data[y++]-p[0])*d[0],a.data[f]=(t.data[_++]-p[1])*d[1],a.data[m]=(t.data[b++]-p[2])*d[2],a.data[g]=-1===$?255:(t.data[$++]-p[3])*d[3]}else throw Error("Can not access image data");return a}}),M=l(()=>{G(),C=(t,r)=>{if(void 0===t)throw Error("Image buffer must be defined");if(void 0===r.height||void 0===r.width)throw Error("Image height and width must be defined");if("NHWC"===r.tensorLayout)throw Error("NHWC Tensor layout is not supported yet");let{height:i,width:a}=r,s=r.norm??{mean:255,bias:0},n,o;n="number"==typeof s.mean?[s.mean,s.mean,s.mean,s.mean]:[s.mean[0],s.mean[1],s.mean[2],s.mean[3]??255],o="number"==typeof s.bias?[s.bias,s.bias,s.bias,s.bias]:[s.bias[0],s.bias[1],s.bias[2],s.bias[3]??0];let u=void 0!==r.format?r.format:"RGBA",l=void 0!==r.tensorFormat&&void 0!==r.tensorFormat?r.tensorFormat:"RGB",d=i*a,p=new Float32Array("RGBA"===l?4*d:3*d),c=4,h=0,f=1,m=2,g=3,y=0,_=d,b=2*d,$=-1;"RGB"===u&&(c=3,h=0,f=1,m=2,g=-1),"RGBA"===l?$=3*d:"RBG"===l?(y=0,b=d,_=2*d):"BGR"===l&&(b=0,_=d,y=2*d);for(let r=0;r<d;r++,h+=c,m+=c,f+=c,g+=c)p[y++]=(t[h]+o[0])/n[0],p[_++]=(t[f]+o[1])/n[1],p[b++]=(t[m]+o[2])/n[2],-1!==$&&-1!==g&&(p[$++]=(t[g]+o[3])/n[3]);return"RGBA"===l?new W("float32",p,[1,4,i,a]):new W("float32",p,[1,3,i,a])},z=async(t,r)=>{let i="u">typeof HTMLImageElement&&t instanceof HTMLImageElement,a="u">typeof ImageData&&t instanceof ImageData,s="u">typeof ImageBitmap&&t instanceof ImageBitmap,n="string"==typeof t,o,u=r??{},l=()=>{if("u">typeof document)return document.createElement("canvas");if("u">typeof OffscreenCanvas)return new OffscreenCanvas(1,1);throw Error("Canvas is not supported")},d=t=>"u">typeof HTMLCanvasElement&&t instanceof HTMLCanvasElement||t instanceof OffscreenCanvas?t.getContext("2d"):null;if(i){let i=l();i.width=t.width,i.height=t.height;let a=d(i);if(null!=a){let i=t.height,s=t.width;if(void 0!==r&&void 0!==r.resizedHeight&&void 0!==r.resizedWidth&&(i=r.resizedHeight,s=r.resizedWidth),void 0!==r){if(u=r,void 0!==r.tensorFormat)throw Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=i,u.width=s}else u.tensorFormat="RGBA",u.height=i,u.width=s;a.drawImage(t,0,0),o=a.getImageData(0,0,s,i).data}else throw Error("Can not access image data")}else if(a){let i,a;if(void 0!==r&&void 0!==r.resizedWidth&&void 0!==r.resizedHeight?(i=r.resizedHeight,a=r.resizedWidth):(i=t.height,a=t.width),void 0!==r&&(u=r),u.format="RGBA",u.height=i,u.width=a,void 0!==r){let r=l();r.width=a,r.height=i;let s=d(r);if(null!=s)s.putImageData(t,0,0),o=s.getImageData(0,0,a,i).data;else throw Error("Can not access image data")}else o=t.data}else if(s){if(void 0===r)throw Error("Please provide image config with format for Imagebitmap");let i=l();i.width=t.width,i.height=t.height;let a=d(i);if(null!=a){let r=t.height,i=t.width;return a.drawImage(t,0,0,i,r),o=a.getImageData(0,0,i,r).data,u.height=r,u.width=i,C(o,u)}throw Error("Can not access image data")}else{if(n)return new Promise((r,i)=>{let a=l(),s=d(a);if(!t||!s)return i();let n=new Image;n.crossOrigin="Anonymous",n.src=t,n.onload=()=>{a.width=n.width,a.height=n.height,s.drawImage(n,0,0,a.width,a.height);let t=s.getImageData(0,0,a.width,a.height);u.height=a.height,u.width=a.width,r(C(t.data,u))}});throw Error("Input data provided is not supported - aborted tensor creation")}if(void 0!==o)return C(o,u);throw Error("Input data provided is not supported - aborted tensor creation")},A=(t,r)=>{let{width:i,height:a,download:s,dispose:n}=r;return new W({location:"texture",type:"float32",texture:t,dims:[1,a,i,4],download:s,dispose:n})},O=(t,r)=>{let{dataType:i,dims:a,download:s,dispose:n}=r;return new W({location:"gpu-buffer",type:i??"float32",gpuBuffer:t,dims:a,download:s,dispose:n})},R=(t,r)=>{let{dataType:i,dims:a,download:s,dispose:n}=r;return new W({location:"ml-tensor",type:i??"float32",mlTensor:t,dims:a,download:s,dispose:n})},B=(t,r,i)=>new W({location:"cpu-pinned",type:t,data:r,dims:i??[r.length]})}),L=l(()=>{D=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),P=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),U=!1,N=()=>{if(!U){U=!0;let t="u">typeof BigInt64Array&&BigInt64Array.from,r="u">typeof BigUint64Array&&BigUint64Array.from,i=globalThis.Float16Array,a="u">typeof i&&i.from;t&&(D.set("int64",BigInt64Array),P.set(BigInt64Array,"int64")),r&&(D.set("uint64",BigUint64Array),P.set(BigUint64Array,"uint64")),a?(D.set("float16",i),P.set(i,"float16")):D.set("float16",Uint16Array)}}}),F=l(()=>{G(),V=t=>{let r=1;for(let i=0;i<t.length;i++){let a=t[i];if("number"!=typeof a||!Number.isSafeInteger(a))throw TypeError(`dims[${i}] must be an integer, got: ${a}`);if(a<0)throw RangeError(`dims[${i}] must be a non-negative integer, got: ${a}`);r*=a}return r},q=(t,r)=>{switch(t.location){case"cpu":return new W(t.type,t.data,r);case"cpu-pinned":return new W({location:"cpu-pinned",data:t.data,type:t.type,dims:r});case"texture":return new W({location:"texture",texture:t.texture,type:t.type,dims:r});case"gpu-buffer":return new W({location:"gpu-buffer",gpuBuffer:t.gpuBuffer,type:t.type,dims:r});case"ml-tensor":return new W({location:"ml-tensor",mlTensor:t.mlTensor,type:t.type,dims:r});default:throw Error(`tensorReshape: tensor location ${t.location} is not supported`)}}}),G=l(()=>{I(),M(),L(),F(),W=class{constructor(t,r,i){let a,s;if(N(),"object"==typeof t&&"location"in t)switch(this.dataLocation=t.location,a=t.type,s=t.dims,t.location){case"cpu-pinned":{let r=D.get(a);if(!r)throw TypeError(`unsupported type "${a}" to create tensor from pinned buffer`);if(!(t.data instanceof r))throw TypeError(`buffer should be of type ${r.name}`);this.cpuData=t.data;break}case"texture":if("float32"!==a)throw TypeError(`unsupported type "${a}" to create tensor from texture`);this.gpuTextureData=t.texture,this.downloader=t.download,this.disposer=t.dispose;break;case"gpu-buffer":if("float32"!==a&&"float16"!==a&&"int32"!==a&&"int64"!==a&&"uint32"!==a&&"uint8"!==a&&"bool"!==a&&"uint4"!==a&&"int4"!==a)throw TypeError(`unsupported type "${a}" to create tensor from gpu buffer`);this.gpuBufferData=t.gpuBuffer,this.downloader=t.download,this.disposer=t.dispose;break;case"ml-tensor":if("float32"!==a&&"float16"!==a&&"int32"!==a&&"int64"!==a&&"uint32"!==a&&"uint64"!==a&&"int8"!==a&&"uint8"!==a&&"bool"!==a&&"uint4"!==a&&"int4"!==a)throw TypeError(`unsupported type "${a}" to create tensor from MLTensor`);this.mlTensorData=t.mlTensor,this.downloader=t.download,this.disposer=t.dispose;break;default:throw Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let n,o;if("string"==typeof t)if(a=t,o=i,"string"===t){if(!Array.isArray(r))throw TypeError("A string tensor's data must be a string array.");n=r}else{let i=D.get(t);if(void 0===i)throw TypeError(`Unsupported tensor type: ${t}.`);if(Array.isArray(r)){if("float16"===t&&i===Uint16Array||"uint4"===t||"int4"===t)throw TypeError(`Creating a ${t} tensor from number array is not supported. Please use ${i.name} as data.`);n="uint64"===t||"int64"===t?i.from(r,BigInt):i.from(r)}else if(r instanceof i)n=r;else if(r instanceof Uint8ClampedArray)if("uint8"===t)n=Uint8Array.from(r);else throw TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if("float16"===t&&r instanceof Uint16Array&&i!==Uint16Array)n=new globalThis.Float16Array(r.buffer,r.byteOffset,r.length);else throw TypeError(`A ${a} tensor's data must be type of ${i}`)}else if(o=r,Array.isArray(t)){if(0===t.length)throw TypeError("Tensor type cannot be inferred from an empty array.");let r=typeof t[0];if("string"===r)a="string",n=t;else if("boolean"===r)a="bool",n=Uint8Array.from(t);else throw TypeError(`Invalid element type of data array: ${r}.`)}else if(t instanceof Uint8ClampedArray)a="uint8",n=Uint8Array.from(t);else{let r=P.get(t.constructor);if(void 0===r)throw TypeError(`Unsupported type for tensor data: ${t.constructor}.`);a=r,n=t}if(void 0===o)o=[n.length];else if(!Array.isArray(o))throw TypeError("A tensor's dims must be a number array");s=o,this.cpuData=n,this.dataLocation="cpu"}let n=V(s);if(this.cpuData&&n!==this.cpuData.length&&("uint4"!==a&&"int4"!==a||Math.ceil(n/2)!==this.cpuData.length))throw Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=a,this.dims=s,this.size=n}static async fromImage(t,r){return z(t,r)}static fromTexture(t,r){return A(t,r)}static fromGpuBuffer(t,r){return O(t,r)}static fromMLTensor(t,r){return R(t,r)}static fromPinnedBuffer(t,r,i){return B(t,r,i)}toDataURL(t){return E(this,t)}toImageData(t){return k(this,t)}get data(){if(this.ensureValid(),!this.cpuData)throw Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(t){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":if(!this.downloader)throw Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let r=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=r,t&&this.disposer&&(this.disposer(),this.disposer=void 0),r}finally{this.isDownloading=!1}default:throw Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if("none"===this.dataLocation)throw Error("The tensor is disposed.")}reshape(t){if(this.ensureValid(),this.downloader||this.disposer)throw Error("Cannot reshape a tensor that owns GPU resource.");return q(this,t)}}}),H=l(()=>{G(),j=W}),ee=l(()=>{x(),K=(t,r)=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&console.timeStamp(`${t}::ORT::${r}`)},Z=(t,r)=>{let i=Error().stack?.split(/\r\n|\r|\n/g)||[],a=!1;for(let s=0;s<i.length;s++){if(a&&!i[s].includes("TRACE_FUNC")){let a=`FUNC_${t}::${i[s].trim().split(" ")[1]}`;r&&(a+=`::${r}`),K("CPU",a);return}i[s].includes("TRACE_FUNC")&&(a=!0)}},Q=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&Z("BEGIN",t)},X=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&Z("END",t)},Y=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&console.time(`ORT::${t}`)},J=t=>{(typeof v.trace>"u"?v.wasm.trace:v.trace)&&console.timeEnd(`ORT::${t}`)}}),er=l(()=>{y(),H(),ee(),et=class t{constructor(t){this.handler=t}async run(t,r,i){Q(),Y("InferenceSession.run");let a={},s={};if("object"!=typeof t||null===t||t instanceof j||Array.isArray(t))throw TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let n=!0;if("object"==typeof r){if(null===r)throw TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof j)throw TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(0===r.length)throw TypeError("'fetches' cannot be an empty array.");for(let t of(n=!1,r)){if("string"!=typeof t)throw TypeError("'fetches' must be a string array or an object.");if(-1===this.outputNames.indexOf(t))throw RangeError(`'fetches' contains invalid output name: ${t}.`);a[t]=null}if("object"==typeof i&&null!==i)s=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else{let t=!1,o=Object.getOwnPropertyNames(r);for(let i of this.outputNames)if(-1!==o.indexOf(i)){let s=r[i];(null===s||s instanceof j)&&(t=!0,n=!1,a[i]=s)}if(t){if("object"==typeof i&&null!==i)s=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else s=r}}else if("u">typeof r)throw TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let r of this.inputNames)if(typeof t[r]>"u")throw Error(`input '${r}' is missing in 'feeds'.`);if(n)for(let t of this.outputNames)a[t]=null;let o=await this.handler.run(t,a,s),u={};for(let t in o)if(Object.hasOwnProperty.call(o,t)){let r=o[t];r instanceof j?u[t]=r:u[t]=new j(r.type,r.data,r.dims)}return J("InferenceSession.run"),X(),u}async release(){return this.handler.dispose()}static async create(r,i,a,s){Q(),Y("InferenceSession.create");let n,o={};if("string"==typeof r){if(n=r,"object"==typeof i&&null!==i)o=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if(r instanceof Uint8Array){if(n=r,"object"==typeof i&&null!==i)o=i;else if("u">typeof i)throw TypeError("'options' must be an object.")}else if(r instanceof ArrayBuffer||"u">typeof SharedArrayBuffer&&r instanceof SharedArrayBuffer){let t=0,u=r.byteLength;if("object"==typeof i&&null!==i)o=i;else if("number"==typeof i){if(!Number.isSafeInteger(t=i))throw RangeError("'byteOffset' must be an integer.");if(t<0||t>=r.byteLength)throw RangeError(`'byteOffset' is out of range [0, ${r.byteLength}).`);if(u=r.byteLength-t,"number"==typeof a){if(!Number.isSafeInteger(u=a))throw RangeError("'byteLength' must be an integer.");if(u<=0||t+u>r.byteLength)throw RangeError(`'byteLength' is out of range (0, ${r.byteLength-t}].`);if("object"==typeof s&&null!==s)o=s;else if("u">typeof s)throw TypeError("'options' must be an object.")}else if("u">typeof a)throw TypeError("'byteLength' must be a number.")}else if("u">typeof i)throw TypeError("'options' must be an object.");n=new Uint8Array(r,t,u)}else throw TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await g(o),d=await u.createInferenceSessionHandler(n,l);return J("InferenceSession.create"),X(),new t(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),ea=l(()=>{er(),ei=et}),es=l(()=>{}),en=l(()=>{}),eo=l(()=>{}),eu=l(()=>{}),d(el={},{InferenceSession:()=>ei,TRACE:()=>K,TRACE_EVENT_BEGIN:()=>Y,TRACE_EVENT_END:()=>J,TRACE_FUNC_BEGIN:()=>Q,TRACE_FUNC_END:()=>X,Tensor:()=>j,env:()=>S,registerBackend:()=>f}),ed=l(()=>{_(),T(),ea(),H(),es(),en(),ee(),eo(),eu()}),ep=l(()=>{}),d(ec={},{default:()=>ef}),em=l(()=>{tr(),eR(),eE(),(eh=globalThis.self?.name==="ort-wasm-proxy-worker")&&(self.onmessage=t=>{let{type:r,in:i}=t.data;try{switch(r){case"init-wasm":eA(i.wasm).then(()=>{e1(i).then(()=>{postMessage({type:r})},t=>{postMessage({type:r,err:t})})},t=>{postMessage({type:r,err:t})});break;case"init-ep":{let{epName:t,env:a}=i;e2(a,t).then(()=>{postMessage({type:r})},t=>{postMessage({type:r,err:t})});break}case"copy-from":{let{buffer:t}=i,a=e6(t);postMessage({type:r,out:a});break}case"create":{let{model:t,options:a}=i;e8(t,a).then(t=>{postMessage({type:r,out:t})},t=>{postMessage({type:r,err:t})});break}case"release":e5(i),postMessage({type:r});break;case"run":{let{sessionId:t,inputIndices:a,inputs:s,outputIndices:n,options:o}=i;e9(t,a,s,n,Array(n.length).fill(null),o).then(t=>{t.some(t=>"cpu"!==t[3])?postMessage({type:r,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:r,out:t},tt([...s,...t]))},t=>{postMessage({type:r,err:t})});break}case"end-profiling":te(i),postMessage({type:r})}}catch(t){postMessage({type:r,err:t})}}),ef=eh?null:t=>new Worker(t??ey,{type:"classic",name:"ort-wasm-proxy-worker"})}),eE=l(()=>{ep(),eg=typeof location>"u"?void 0:location.origin,ey="u">typeof document?document.currentScript?.src:"u">typeof self?self.location?.href:void 0,e_=()=>{if(ey&&!ey.startsWith("blob:"))return ey.substring(0,ey.lastIndexOf("/")+1)},eb=(t,r)=>{try{let i=r??ey;return(i?new URL(t,i):new URL(t)).origin===eg}catch{return!1}},e$=async t=>{let r=await (await fetch(t,{credentials:"same-origin"})).blob();return URL.createObjectURL(r)},ew=async t=>(await import(t)).default,ev=(em(),p(ec)).default,ex=async()=>{if(!ey)throw Error("Failed to load proxy worker: cannot determine the script source URL.");if(eb(ey))return[void 0,ev()];let t=await e$(ey);return[t,ev(t)]},eS=void 0,eT=async(t,r,i,a)=>{let s=eS&&!(t||r);if(s)if(ey)s=eb(ey)||a&&!i;else if(a&&!i)s=!0;else throw Error("cannot determine the script source URL.");if(s)return[void 0,eS];{let a,s,n="ort-wasm-simd-threaded.mjs",o=t??((t,r)=>{let i=r??ey;try{return(i?new URL(t,i):new URL(t)).href}catch{return}})(n,r),u=i&&o&&!eb(o,r),l=u?await e$(o):o??(a=n,s=r,`${s??"./"}${a}`);return[u?l:void 0,await ew(l)]}}}),eR=l(()=>{eE(),eI=!1,eC=!1,ez=!1,eA=async t=>{if(eI)return Promise.resolve();if(eC)throw Error("multiple calls to 'initializeWebAssembly()' detected.");if(ez)throw Error("previous call to 'initializeWebAssembly()' failed.");eC=!0;let r=t.initTimeout,i=t.numThreads;if(!1!==t.simd){if("relaxed"===t.simd){if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}})())throw Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!(()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}})())throw Error("WebAssembly SIMD is not supported in the current environment.")}let a=(()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return"u">typeof MessageChannel&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}})();i>1&&!a&&("u">typeof self&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),t.numThreads=i=1);let s=t.wasmPaths,n="string"==typeof s?s:void 0,o=s?.mjs,u=o?.href??o,l=s?.wasm,d=l?.href??l,p=t.wasmBinary,[c,h]=await eT(u,n,i>1,!!p||!!d),f=!1,m=[];if(r>0&&m.push(new Promise(t=>{setTimeout(()=>{f=!0,t()},r)})),m.push(new Promise((t,r)=>{let a={numThreads:i};if(p)a.wasmBinary=p,a.locateFile=t=>t;else if(d||n)a.locateFile=t=>d??n+t;else if(u&&0!==u.indexOf("blob:"))a.locateFile=t=>new URL(t,u).href;else if(c){let t=e_();t&&(a.locateFile=r=>t+r)}h(a).then(r=>{eC=!1,eI=!0,ek=r,t(),c&&URL.revokeObjectURL(c)},t=>{eC=!1,ez=!0,r(t)})})),await Promise.race(m),f)throw Error(`WebAssembly backend initializing failed due to timeout: ${r}ms`)},eO=()=>{if(eI&&ek)return ek;throw Error("WebAssembly is not initialized yet.")}}),eP=l(()=>{eR(),eB=(t,r)=>{let i=eO(),a=i.lengthBytesUTF8(t)+1,s=i._malloc(a);return i.stringToUTF8(t,s,a),r.push(s),s},eM=(t,r,i,a)=>{if("object"==typeof t&&null!==t){if(i.has(t))throw Error("Circular reference in options");i.add(t)}Object.entries(t).forEach(([t,s])=>{let n=r?r+t:t;if("object"==typeof s)eM(s,n+".",i,a);else if("string"==typeof s||"number"==typeof s)a(n,s.toString());else if("boolean"==typeof s)a(n,s?"1":"0");else throw Error(`Can't handle extra config type: ${typeof s}`)})},eD=t=>{let r=eO(),i=r.stackSave();try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);r._OrtGetLastError(a,a+i);let s=Number(r.getValue(a,4===i?"i32":"i64")),n=r.getValue(a+i,"*"),o=n?r.UTF8ToString(n):"";throw Error(`${t} ERROR_CODE: ${s}, ERROR_MESSAGE: ${o}`)}finally{r.stackRestore(i)}}}),eN=l(()=>{eR(),eP(),eU=t=>{let r=eO(),i=0,a=[],s=t||{};try{if(t?.logSeverityLevel===void 0)s.logSeverityLevel=2;else if("number"!=typeof t.logSeverityLevel||!Number.isInteger(t.logSeverityLevel)||t.logSeverityLevel<0||t.logSeverityLevel>4)throw Error(`log severity level is not valid: ${t.logSeverityLevel}`);if(t?.logVerbosityLevel===void 0)s.logVerbosityLevel=0;else if("number"!=typeof t.logVerbosityLevel||!Number.isInteger(t.logVerbosityLevel))throw Error(`log verbosity level is not valid: ${t.logVerbosityLevel}`);t?.terminate===void 0&&(s.terminate=!1);let n=0;return t?.tag!==void 0&&(n=eB(t.tag,a)),i=r._OrtCreateRunOptions(s.logSeverityLevel,s.logVerbosityLevel,!!s.terminate,n),0===i&&eD("Can't create run options."),t?.extra!==void 0&&eM(t.extra,"",new WeakSet,(t,s)=>{let n=eB(t,a),o=eB(s,a);0!==r._OrtAddRunConfigEntry(i,n,o)&&eD(`Can't set a run config entry: ${t} - ${s}.`)}),[i,a]}catch(t){throw 0!==i&&r._OrtReleaseRunOptions(i),a.forEach(t=>r._free(t)),t}}}),eF=l(()=>{eR(),eP(),eL=(t,r,i,a)=>{let s=eB(r,a),n=eB(i,a);0!==eO()._OrtAddSessionConfigEntry(t,s,n)&&eD(`Can't set a session config entry: ${r} - ${i}.`)},eV=async(t,r,i)=>{for(let a of r.executionProviders){let r="string"==typeof a?a:a.name,s=[];switch(r){case"webnn":if(r="WEBNN",eL(t,"session.disable_quant_qdq","1",i),eL(t,"session.disable_qdq_constant_folding","1",i),"string"!=typeof a){let r=a?.deviceType;r&&eL(t,"deviceType",r,i)}break;case"webgpu":if(r="JS","string"!=typeof a&&a?.preferredLayout){if("NCHW"!==a.preferredLayout&&"NHWC"!==a.preferredLayout)throw Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${a.preferredLayout}`);eL(t,"preferredLayout",a.preferredLayout,i)}break;case"wasm":case"cpu":continue;default:throw Error(`not supported execution provider: ${r}`)}let n=eB(r,i),o=s.length,u=0,l=0;if(o>0){u=eO()._malloc(o*eO().PTR_SIZE),i.push(u),l=eO()._malloc(o*eO().PTR_SIZE),i.push(l);for(let t=0;t<o;t++)eO().setValue(u+t*eO().PTR_SIZE,s[t][0],"*"),eO().setValue(l+t*eO().PTR_SIZE,s[t][1],"*")}await eO()._OrtAppendExecutionProvider(t,n,u,l,o)!==0&&eD(`Can't append execution provider: ${r}.`)}},eq=async t=>{var r;let i,a=eO(),s=0,n=[],o=t||{};(r=o).extra||(r.extra={}),r.extra.session||(r.extra.session={}),(i=r.extra.session).use_ort_model_bytes_directly||(i.use_ort_model_bytes_directly="1"),r.executionProviders&&r.executionProviders.some(t=>("string"==typeof t?t:t.name)==="webgpu")&&(r.enableMemPattern=!1);try{let t=(t=>{switch(t){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw Error(`unsupported graph optimization level: ${t}`)}})(o.graphOptimizationLevel??"all"),r=(t=>{switch(t){case"sequential":return 0;case"parallel":return 1;default:throw Error(`unsupported execution mode: ${t}`)}})(o.executionMode??"sequential"),i="string"==typeof o.logId?eB(o.logId,n):0,u=o.logSeverityLevel??2;if(!Number.isInteger(u)||u<0||u>4)throw Error(`log severity level is not valid: ${u}`);let l=o.logVerbosityLevel??0;if(!Number.isInteger(l)||l<0||l>4)throw Error(`log verbosity level is not valid: ${l}`);let d="string"==typeof o.optimizedModelFilePath?eB(o.optimizedModelFilePath,n):0;if(s=a._OrtCreateSessionOptions(t,!!o.enableCpuMemArena,!!o.enableMemPattern,r,!!o.enableProfiling,0,i,u,l,d),0===s&&eD("Can't create session options."),o.executionProviders&&await eV(s,o,n),void 0!==o.enableGraphCapture){if("boolean"!=typeof o.enableGraphCapture)throw Error(`enableGraphCapture must be a boolean value: ${o.enableGraphCapture}`);eL(s,"enableGraphCapture",o.enableGraphCapture.toString(),n)}if(o.freeDimensionOverrides)for(let[t,r]of Object.entries(o.freeDimensionOverrides)){if("string"!=typeof t)throw Error(`free dimension override name must be a string: ${t}`);if("number"!=typeof r||!Number.isInteger(r)||r<0)throw Error(`free dimension override value must be a non-negative integer: ${r}`);let i=eB(t,n);0!==a._OrtAddFreeDimensionOverride(s,i,r)&&eD(`Can't set a free dimension override: ${t} - ${r}.`)}return void 0!==o.extra&&eM(o.extra,"",new WeakSet,(t,r)=>{eL(s,t,r,n)}),[s,n]}catch(t){throw 0!==s&&0!==a._OrtReleaseSessionOptions(s)&&eD("Can't release session options."),n.forEach(t=>a._free(t)),t}}}),eY=l(()=>{eW=t=>{switch(t){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw Error(`unsupported data type: ${t}`)}},eG=t=>{switch(t){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw Error(`unsupported data type: ${t}`)}},ej=(t,r)=>{let i=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][t],a="number"==typeof r?r:r.reduce((t,r)=>t*r,1);return i>0?Math.ceil(a*i):void 0},eH=t=>{switch(t){case"float16":return"u">typeof Float16Array&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":case"bool":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw Error(`unsupported type: ${t}`)}},eK=t=>{switch(t){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw Error(`unsupported logging level: ${t}`)}},eZ=t=>"float32"===t||"float16"===t||"int32"===t||"int64"===t||"uint32"===t||"uint8"===t||"bool"===t||"uint4"===t||"int4"===t,eQ=t=>"float32"===t||"float16"===t||"int32"===t||"int64"===t||"uint32"===t||"uint64"===t||"int8"===t||"uint8"===t||"bool"===t||"uint4"===t||"int4"===t,eX=t=>{switch(t){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw Error(`unsupported data location: ${t}`)}}}),e0=l(()=>{ep(),eJ=async t=>{if("string"!=typeof t)return t instanceof Blob?new Uint8Array(await t.arrayBuffer()):t instanceof Uint8Array?t:new Uint8Array(t);{let r=await fetch(t);if(!r.ok)throw Error(`failed to load external data file: ${t}`);let i=r.headers.get("Content-Length"),a=i?parseInt(i,10):0;if(a<0x40000000)return new Uint8Array(await r.arrayBuffer());{if(!r.body)throw Error(`failed to load external data file: ${t}, no response body.`);let i=r.body.getReader(),s;try{s=new ArrayBuffer(a)}catch(t){if(t instanceof RangeError){let t=Math.ceil(a/65536);s=new WebAssembly.Memory({initial:t,maximum:t}).buffer}else throw t}let n=0;for(;;){let{done:t,value:r}=await i.read();if(t)break;let a=r.byteLength;new Uint8Array(s,n,a).set(r),n+=a}return new Uint8Array(s,0,a)}}}}),tr=l(()=>{ed(),eN(),eF(),eY(),eR(),eP(),e0(),e1=async t=>{var r,i;r=t.wasm.numThreads,i=eK(t.logLevel),0!==eO()._OrtInit(r,i)&&eD("Can't initialize onnxruntime.")},e2=async(t,r)=>{eO().asyncInit?.();let i=t.webgpu.adapter;if("webgpu"===r){if(typeof navigator>"u"||!navigator.gpu)throw Error("WebGPU is not supported in current environment");if(i){if("object"!=typeof i.limits||"object"!=typeof i.features||"function"!=typeof i.requestDevice)throw Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=t.webgpu.powerPreference;if(void 0!==r&&"low-power"!==r&&"high-performance"!==r)throw Error(`Invalid powerPreference setting: "${r}"`);let a=t.webgpu.forceFallbackAdapter;if(void 0!==a&&"boolean"!=typeof a)throw Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(!(i=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:a})))throw Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if("webnn"===r&&(typeof navigator>"u"||!navigator.ml))throw Error("WebNN is not supported in current environment")},e3=new Map,e4=(t,r)=>{let i=eO(),a=i.stackSave(),s=0;try{let a=i.PTR_SIZE,n=i.stackAlloc(2*a);0!==i._OrtGetInputOutputMetadata(t,r,n,n+a)&&eD("Can't get session input/output metadata.");let o=Number(i.getValue(n,"*"));s=Number(i.getValue(n+a,"*"));let u=i.HEAP32[s/4];if(0===u)return[o,0];let l=i.HEAPU32[s/4+1],d=[];for(let t=0;t<l;t++){let r=Number(i.getValue(s+8+t*a,"*"));d.push(0!==r?i.UTF8ToString(r):Number(i.getValue(s+8+(t+l)*a,"*")))}return[o,u,d]}finally{i.stackRestore(a),0!==s&&i._OrtFree(s)}},e6=t=>{let r=eO(),i=r._malloc(t.byteLength);if(0===i)throw Error(`Can't create a session. failed to allocate a buffer of size ${t.byteLength}.`);return r.HEAPU8.set(t,i),[i,t.byteLength]},e8=async(t,r)=>{let i,a,s=eO();Array.isArray(t)?[i,a]=t:t.buffer===s.HEAPU8.buffer?[i,a]=[t.byteOffset,t.byteLength]:[i,a]=e6(t);let n=0,o=0,u=[],l=[],d=[];try{if([o,u]=await eq(r),r?.externalData&&s.mountExternalData){let t=[];for(let i of r.externalData){let r="string"==typeof i?i:i.path;t.push(eJ("string"==typeof i?i:i.data).then(t=>{s.mountExternalData(r,t)}))}await Promise.all(t)}for(let t of r?.executionProviders??[])if(("string"==typeof t?t:t.name)==="webnn"){if(s.shouldTransferToMLTensor=!1,"string"!=typeof t){let r=t?.context,i=t?.gpuDevice,a=t?.deviceType,n=t?.powerPreference;r?s.currentContext=r:i?s.currentContext=await s.webnnCreateMLContext(i):s.currentContext=await s.webnnCreateMLContext({deviceType:a,powerPreference:n})}else s.currentContext=await s.webnnCreateMLContext();break}n=await s._OrtCreateSession(i,a,o),s.webgpuOnCreateSession?.(n),0===n&&eD("Can't create a session."),s.jsepOnCreateSession?.(),s.currentContext&&(s.webnnRegisterMLContext(n,s.currentContext),s.currentContext=void 0,s.shouldTransferToMLTensor=!0);let[t,p]=(t=>{let r=eO(),i=r.stackSave();try{let i=r.PTR_SIZE,a=r.stackAlloc(2*i);0!==r._OrtGetInputOutputCount(t,a,a+i)&&eD("Can't get session input/output count.");let s=4===i?"i32":"i64";return[Number(r.getValue(a,s)),Number(r.getValue(a+i,s))]}finally{r.stackRestore(i)}})(n),c=!!r?.enableGraphCapture,h=[],f=[],m=[],g=[];for(let r=0;r<t;r++){let[t,i,a]=e4(n,r);0===t&&eD("Can't get an input name."),l.push(t);let o=s.UTF8ToString(t);h.push(o),m.push(0===i?{name:o,isTensor:!1}:{name:o,isTensor:!0,type:eG(i),shape:a})}for(let r=0;r<p;r++){let[i,a,o]=e4(n,r+t);0===i&&eD("Can't get an output name."),d.push(i);let u=s.UTF8ToString(i);f.push(u),g.push(0===a?{name:u,isTensor:!1}:{name:u,isTensor:!0,type:eG(a),shape:o})}return e3.set(n,[n,l,d,null,c,!1]),[n,h,f,m,g]}catch(t){throw l.forEach(t=>s._OrtFree(t)),d.forEach(t=>s._OrtFree(t)),0!==n&&0!==s._OrtReleaseSession(n)&&eD("Can't release session."),t}finally{s._free(i),0!==o&&0!==s._OrtReleaseSessionOptions(o)&&eD("Can't release session options."),u.forEach(t=>s._free(t)),s.unmountExternalData?.()}},e5=t=>{let r=eO(),i=e3.get(t);if(!i)throw Error(`cannot release session. invalid session id: ${t}`);let[a,s,n,o,u]=i;o&&(u&&0!==r._OrtClearBoundOutputs(o.handle)&&eD("Can't clear bound outputs."),0!==r._OrtReleaseBinding(o.handle)&&eD("Can't release IO binding.")),r.jsepOnReleaseSession?.(t),r.webnnOnReleaseSession?.(t),r.webgpuOnReleaseSession?.(t),s.forEach(t=>r._OrtFree(t)),n.forEach(t=>r._OrtFree(t)),0!==r._OrtReleaseSession(a)&&eD("Can't release session."),e3.delete(t)},e7=async(t,r,i,a,s,n,o=!1)=>{if(!t)return void r.push(0);let u=eO(),l=u.PTR_SIZE,d=t[0],p=t[1],c=t[3],h=c,f,m;if("string"===d&&("gpu-buffer"===c||"ml-tensor"===c))throw Error("String tensor is not supported on GPU.");if(o&&"gpu-buffer"!==c)throw Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if("gpu-buffer"===c){let r=t[2].gpuBuffer;m=ej(eW(d),p);{let t=u.jsepRegisterBuffer;if(!t)throw Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');f=t(a,n,r,m)}}else if("ml-tensor"===c){let r=t[2].mlTensor;m=ej(eW(d),p);let i=u.webnnRegisterMLTensor;if(!i)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');f=i(a,r,eW(d),p)}else{let r=t[2];if(Array.isArray(r)){m=l*r.length,f=u._malloc(m),i.push(f);for(let t=0;t<r.length;t++){if("string"!=typeof r[t])throw TypeError(`tensor data at index ${t} is not a string`);u.setValue(f+t*l,eB(r[t],i),"*")}}else{let t=u.webnnIsGraphInput,n=u.webnnIsGraphOutput;if("string"!==d&&t&&n){let o=u.UTF8ToString(s);if(t(a,o)||n(a,o)){let t=eW(d);m=ej(t,p),h="ml-tensor";let i=u.webnnCreateTemporaryTensor,s=u.webnnUploadTensor;if(!i||!s)throw Error('Tensor location "ml-tensor" is not supported without using WebNN.');let n=await i(a,t,p);s(n,new Uint8Array(r.buffer,r.byteOffset,r.byteLength)),f=n}else m=r.byteLength,f=u._malloc(m),i.push(f),u.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,m),f)}else m=r.byteLength,f=u._malloc(m),i.push(f),u.HEAPU8.set(new Uint8Array(r.buffer,r.byteOffset,m),f)}}let g=u.stackSave(),y=u.stackAlloc(4*p.length);try{p.forEach((t,r)=>u.setValue(y+r*l,t,4===l?"i32":"i64"));let t=u._OrtCreateTensor(eW(d),f,m,y,p.length,eX(h));0===t&&eD(`Can't create tensor for input/output. session=${a}, index=${n}.`),r.push(t)}finally{u.stackRestore(g)}},e9=async(t,r,i,a,s,n)=>{let o=eO(),u=o.PTR_SIZE,l=e3.get(t);if(!l)throw Error(`cannot run inference. invalid session id: ${t}`);let d=l[0],p=l[1],c=l[2],h=l[3],f=l[4],m=(l[5],r.length),g=a.length,y=0,_=[],b=[],$=[],w=[],v=[],x=o.stackSave(),S=o.stackAlloc(m*u),T=o.stackAlloc(m*u),E=o.stackAlloc(g*u),k=o.stackAlloc(g*u);try{let l;[y,_]=eU(n),Y("wasm prepareInputOutputTensor");for(let a=0;a<m;a++)await e7(i[a],b,w,t,p[r[a]],r[a],f);for(let r=0;r<g;r++)await e7(s[r],$,w,t,c[a[r]],m+a[r],f);J("wasm prepareInputOutputTensor");for(let t=0;t<m;t++)o.setValue(S+t*u,b[t],"*"),o.setValue(T+t*u,p[r[t]],"*");for(let t=0;t<g;t++)o.setValue(E+t*u,$[t],"*"),o.setValue(k+t*u,c[a[t]],"*");o.jsepOnRunStart?.(d),o.webnnOnRunStart?.(d),l=await o._OrtRun(d,T,S,m,k,g,E,y),0!==l&&eD("failed to call OrtRun().");let x=[],I=[];Y("wasm ProcessOutputTensor");for(let r=0;r<g;r++){let i=Number(o.getValue(E+r*u,"*"));if(i===$[r]||v.includes($[r])){x.push(s[r]),i!==$[r]&&0!==o._OrtReleaseTensor(i)&&eD("Can't release tensor.");continue}let n=o.stackSave(),l=o.stackAlloc(4*u),d=!1,p,c=0;try{0!==o._OrtGetTensorData(i,l,l+u,l+2*u,l+3*u)&&eD(`Can't access output tensor data on index ${r}.`);let s=4===u?"i32":"i64",n=Number(o.getValue(l,s));c=o.getValue(l+u,"*");let f=o.getValue(l+2*u,"*"),m=Number(o.getValue(l+3*u,s)),g=[];for(let t=0;t<m;t++)g.push(Number(o.getValue(f+t*u,s)));0!==o._OrtFree(f)&&eD("Can't free memory for tensor dims.");let y=g.reduce((t,r)=>t*r,1);p=eG(n);let _=h?.outputPreferredLocations[a[r]];if("string"===p){if("gpu-buffer"===_||"ml-tensor"===_)throw Error("String tensor is not supported on GPU.");let t=[];for(let r=0;r<y;r++){let i=o.getValue(c+r*u,"*"),a=o.getValue(c+(r+1)*u,"*"),s=r===y-1?void 0:a-i;t.push(o.UTF8ToString(i,s))}x.push([p,g,t,"cpu"])}else if("gpu-buffer"===_&&y>0){let t=o.jsepGetBuffer;if(!t)throw Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let r=t(c),a=ej(n,y);if(void 0===a||!eZ(p))throw Error(`Unsupported data type: ${p}`);d=!0,x.push([p,g,{gpuBuffer:r,download:o.jsepCreateDownloader(r,a,p),dispose:()=>{0!==o._OrtReleaseTensor(i)&&eD("Can't release tensor.")}},"gpu-buffer"])}else if("ml-tensor"===_&&y>0){let r=o.webnnEnsureTensor,a=o.webnnIsGraphInputOutputTypeSupported;if(!r||!a)throw Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(void 0===ej(n,y)||!eQ(p))throw Error(`Unsupported data type: ${p}`);if(!a(t,p,!1))throw Error(`preferredLocation "ml-tensor" for ${p} output is not supported by current WebNN Context.`);let s=await r(t,c,n,g,!1);d=!0,x.push([p,g,{mlTensor:s,download:o.webnnCreateMLTensorDownloader(c,p),dispose:()=>{o.webnnReleaseTensorId(c),o._OrtReleaseTensor(i)}},"ml-tensor"])}else if("ml-tensor-cpu-output"===_&&y>0){let t=o.webnnCreateMLTensorDownloader(c,p)(),r=x.length;d=!0,I.push((async()=>{let a=[r,await t];return o.webnnReleaseTensorId(c),o._OrtReleaseTensor(i),a})()),x.push([p,g,[],"cpu"])}else{let t=new(eH(p))(y);new Uint8Array(t.buffer,t.byteOffset,t.byteLength).set(o.HEAPU8.subarray(c,c+t.byteLength)),x.push([p,g,t,"cpu"])}}finally{o.stackRestore(n),"string"===p&&c&&o._free(c),d||o._OrtReleaseTensor(i)}}for(let[r,i]of(h&&!f&&(0!==o._OrtClearBoundOutputs(h.handle)&&eD("Can't clear bound outputs."),e3.set(t,[d,p,c,h,f,!1])),await Promise.all(I)))x[r][2]=i;return J("wasm ProcessOutputTensor"),x}finally{o.webnnOnRunEnd?.(d),o.stackRestore(x),b.forEach(t=>o._OrtReleaseTensor(t)),$.forEach(t=>o._OrtReleaseTensor(t)),w.forEach(t=>o._free(t)),0!==y&&o._OrtReleaseRunOptions(y),_.forEach(t=>o._free(t))}},te=t=>{let r=eO(),i=e3.get(t);if(!i)throw Error("invalid session id");let a=i[0],s=r._OrtEndProfiling(a);0===s&&eD("Can't get an profile file name."),r._OrtFree(s)},tt=t=>{let r=[];for(let i of t){let t=i[2];!Array.isArray(t)&&"buffer"in t&&r.push(t.buffer)}return r}}),tw=l(()=>{ed(),tr(),eR(),eE(),ti=()=>!!S.wasm.proxy&&"u">typeof document,ts=!1,tn=!1,to=!1,td=new Map,tp=(t,r)=>{let i=td.get(t);i?i.push(r):td.set(t,[r])},tc=()=>{if(ts||!tn||to||!ta)throw Error("worker not ready")},th=t=>{switch(t.data.type){case"init-wasm":ts=!1,t.data.err?(to=!0,tl[1](t.data.err)):(tn=!0,tl[0]()),tu&&(URL.revokeObjectURL(tu),tu=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let r=td.get(t.data.type);t.data.err?r.shift()[1](t.data.err):r.shift()[0](t.data.out)}}},tf=async()=>{if(!tn){if(ts)throw Error("multiple calls to 'initWasm()' detected.");if(to)throw Error("previous call to 'initWasm()' failed.");if(ts=!0,ti())return new Promise((t,r)=>{ta?.terminate(),ex().then(([i,a])=>{try{(ta=a).onerror=t=>r(t),ta.onmessage=th,tl=[t,r];let s={type:"init-wasm",in:S};if(!s.in.wasm.wasmPaths&&i){let t=e_();t&&(s.in.wasm.wasmPaths=t)}ta.postMessage(s),tu=i}catch(t){r(t)}},r)});try{await eA(S.wasm),await e1(S),tn=!0}catch(t){throw to=!0,t}finally{ts=!1}}},tm=async t=>{if(ti())return tc(),new Promise((r,i)=>{tp("init-ep",[r,i]);let a={type:"init-ep",in:{epName:t,env:S}};ta.postMessage(a)});await e2(S,t)},tg=async t=>ti()?(tc(),new Promise((r,i)=>{tp("copy-from",[r,i]),ta.postMessage({type:"copy-from",in:{buffer:t}},[t.buffer])})):e6(t),ty=async(t,r)=>{if(!ti())return e8(t,r);if(r?.preferredOutputLocation)throw Error('session option "preferredOutputLocation" is not supported for proxy.');return tc(),new Promise((i,a)=>{tp("create",[i,a]);let s={type:"create",in:{model:t,options:{...r}}},n=[];t instanceof Uint8Array&&n.push(t.buffer),ta.postMessage(s,n)})},t_=async t=>{if(ti())return tc(),new Promise((r,i)=>{tp("release",[r,i]),ta.postMessage({type:"release",in:t})});e5(t)},tb=async(t,r,i,a,s,n)=>{if(!ti())return e9(t,r,i,a,s,n);if(i.some(t=>"cpu"!==t[3]))throw Error("input tensor on GPU is not supported for proxy.");if(s.some(t=>t))throw Error("pre-allocated output tensor is not supported for proxy.");return tc(),new Promise((s,o)=>{tp("run",[s,o]),ta.postMessage({type:"run",in:{sessionId:t,inputIndices:r,inputs:i,outputIndices:a,options:n}},tt(i))})},t$=async t=>{if(ti())return tc(),new Promise((r,i)=>{tp("end-profiling",[r,i]),ta.postMessage({type:"end-profiling",in:t})});te(t)}}),tT=l(()=>{ed(),tw(),eY(),ep(),e0(),tv=(t,r)=>{switch(t.location){case"cpu":return[t.type,t.dims,t.data,"cpu"];case"gpu-buffer":return[t.type,t.dims,{gpuBuffer:t.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[t.type,t.dims,{mlTensor:t.mlTensor},"ml-tensor"];default:throw Error(`invalid data location: ${t.location} for ${r()}`)}},tx=t=>{switch(t[3]){case"cpu":return new j(t[0],t[2],t[1]);case"gpu-buffer":{let r=t[0];if(!eZ(r))throw Error(`not supported data type: ${r} for deserializing GPU tensor`);let{gpuBuffer:i,download:a,dispose:s}=t[2];return j.fromGpuBuffer(i,{dataType:r,dims:t[1],download:a,dispose:s})}case"ml-tensor":{let r=t[0];if(!eQ(r))throw Error(`not supported data type: ${r} for deserializing MLTensor tensor`);let{mlTensor:i,download:a,dispose:s}=t[2];return j.fromMLTensor(i,{dataType:r,dims:t[1],download:a,dispose:s})}default:throw Error(`invalid data location: ${t[3]}`)}},tS=class{async fetchModelAndCopyToWasmMemory(t){return tg(await eJ(t))}async loadModel(t,r){let i;Q(),i="string"==typeof t?await this.fetchModelAndCopyToWasmMemory(t):t,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await ty(i,r),X()}async dispose(){return t_(this.sessionId)}async run(t,r,i){Q();let a=[],s=[];Object.entries(t).forEach(t=>{let r=t[0],i=t[1],n=this.inputNames.indexOf(r);if(-1===n)throw Error(`invalid input '${r}'`);a.push(i),s.push(n)});let n=[],o=[];Object.entries(r).forEach(t=>{let r=t[0],i=t[1],a=this.outputNames.indexOf(r);if(-1===a)throw Error(`invalid output '${r}'`);n.push(i),o.push(a)});let u=a.map((t,r)=>tv(t,()=>`input "${this.inputNames[s[r]]}"`)),l=n.map((t,r)=>t?tv(t,()=>`output "${this.outputNames[o[r]]}"`):null),d=await tb(this.sessionId,s,u,o,l,i),p={};for(let t=0;t<d.length;t++)p[this.outputNames[o[t]]]=n[t]??tx(d[t]);return X(),p}startProfiling(){}endProfiling(){t$(this.sessionId)}}}),d(tE={},{OnnxruntimeWebAssemblyBackend:()=>tI,initializeFlags:()=>tk,wasmBackend:()=>tC}),tz=l(()=>{ed(),tw(),tT(),tk=()=>{("number"!=typeof S.wasm.initTimeout||S.wasm.initTimeout<0)&&(S.wasm.initTimeout=0);let t=S.wasm.simd;if("boolean"!=typeof t&&void 0!==t&&"fixed"!==t&&"relaxed"!==t&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${t}". Reset it to \`false\` and ignore SIMD feature checking.`),S.wasm.simd=!1),"boolean"!=typeof S.wasm.proxy&&(S.wasm.proxy=!1),"boolean"!=typeof S.wasm.trace&&(S.wasm.trace=!1),"number"!=typeof S.wasm.numThreads||!Number.isInteger(S.wasm.numThreads)||S.wasm.numThreads<=0)if("u">typeof self&&!self.crossOriginIsolated)S.wasm.numThreads=1;else{let t=typeof navigator>"u"?u("node:os").cpus().length:navigator.hardwareConcurrency;S.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},tC=new(tI=class{async init(t){tk(),await tf(),await tm(t)}async createInferenceSessionHandler(t,r){let i=new tS;return await i.loadModel(t,r),i}})}),d(tA={},{InferenceSession:()=>ei,TRACE:()=>K,TRACE_EVENT_BEGIN:()=>Y,TRACE_EVENT_END:()=>J,TRACE_FUNC_BEGIN:()=>Q,TRACE_FUNC_END:()=>X,Tensor:()=>j,default:()=>tO,env:()=>S,registerBackend:()=>f}),ed(),ed(),ed(),tO=el,tR=(tz(),p(tE)).wasmBackend,f("cpu",tR,10),f("wasm",tR,10),Object.defineProperty(S.versions,"web",{value:"1.26.0",enumerable:!0}),r.exports=p(tA)},86962,(t,r,i)=>{"use strict";var a=t.e&&t.e.__createBinding||(Object.create?function(t,r,i,a){void 0===a&&(a=i);var s=Object.getOwnPropertyDescriptor(r,i);(!s||("get"in s?!r.__esModule:s.writable||s.configurable))&&(s={enumerable:!0,get:function(){return r[i]}}),Object.defineProperty(t,a,s)}:function(t,r,i,a){void 0===a&&(a=i),t[a]=r[i]}),s=t.e&&t.e.__setModuleDefault||(Object.create?function(t,r){Object.defineProperty(t,"default",{enumerable:!0,value:r})}:function(t,r){t.default=r}),n=t.e&&t.e.__importStar||function(t){if(t&&t.__esModule)return t;var r={};if(null!=t)for(var i in t)"default"!==i&&Object.prototype.hasOwnProperty.call(t,i)&&a(r,t,i);return s(r,t),r};Object.defineProperty(i,"__esModule",{value:!0}),i.MicVAD=i.getDefaultRealTimeVADOptions=i.ort=i.DEFAULT_MODEL=void 0;let o=n(t.r(5937)),u=t.r(22237),l=t.r(43489),d=t.r(74389),p=t.r(42827),c=t.r(57289),h=t.r(58868);async function f(t,r,i,a,s){await i.audioWorklet.addModule(t),r.processorOptions={...r.processorOptions??{},frameSamples:a};let n=new AudioWorkletNode(i,"vad-helper-worklet",r);return n.port.onmessage=async t=>{let r=t.data;if(!("object"==typeof r&&r&&"message"in r))return void console.error("Invalid message event",r);if(r.message===p.Message.AudioFrame){if(!("data"in r&&r.data instanceof ArrayBuffer))return void console.log("Audio frame message has no data");let t=new Float32Array(r.data);await s(t)}},n}async function m(t,r,i){let a=new h.Resampler({nativeSampleRate:t.sampleRate,targetSampleRate:16e3,targetFrameSize:r});d.log.debug("using script processor");let s=t.createScriptProcessor(4096,1,1),n=!1;return s.onaudioprocess=async t=>{if(!n){n=!0;try{let r=t.inputBuffer.getChannelData(0);for(let s of(t.outputBuffer.getChannelData(0).fill(0),a.process(r)))await i(s)}catch(t){console.error("Error processing audio:",t)}finally{n=!1}}},s.connect(t.destination),s}i.DEFAULT_MODEL="legacy",i.ort=o,i.getDefaultRealTimeVADOptions=t=>({...l.defaultFrameProcessorOptions,onFrameProcessed:()=>{},onVADMisfire:()=>{d.log.debug("VAD misfire")},onSpeechStart:()=>{d.log.debug("Detected speech start")},onSpeechEnd:()=>{d.log.debug("Detected speech end")},onSpeechRealStart:()=>{d.log.debug("Detected real speech start")},baseAssetPath:"./",onnxWASMBasePath:"./",model:t,workletOptions:{},getStream:async()=>await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,autoGainControl:!0,noiseSuppression:!0}}),pauseStream:async t=>{t.getTracks().forEach(t=>{t.stop()})},resumeStream:async()=>await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:!0,autoGainControl:!0,noiseSuppression:!0}}),ortConfig:t=>{t.env.logLevel="error"},startOnLoad:!0,processorType:"auto"});class g{constructor(t,r,i,a,s=!1,n=null,o=null,u=null,l=null,c=null,h=null,g="uninitialized",y=!1){this.options=t,this.frameProcessor=r,this.model=i,this.frameSamples=a,this.listening=s,this.errored=n,this._stream=o,this._audioContext=u,this._vadNode=l,this._mediaStreamAudioSourceNode=c,this._audioProcessorAdapterType=h,this.initializationState=g,this.ownsAudioContext=y,this.getAudioInstances=()=>{if(null===this._stream||null===this._audioContext||null==this._vadNode||null==this._mediaStreamAudioSourceNode)throw Error("MicVAD has null stream, audio context, or processor adapter");return{stream:this._stream,audioContext:this._audioContext,vadNode:this._vadNode,mediaStreamAudioSourceNode:this._mediaStreamAudioSourceNode}},this.setErrored=t=>{this.initializationState="errored",this.errored=t},this.start=async()=>{switch(this.initializationState){case"uninitialized":d.log.debug("initializing micVAD"),this.initializationState="initializing",this.frameProcessor.resume();try{this._stream=await this.options.getStream()}catch(t){throw t instanceof Error?this.setErrored(t.message):this.setErrored(String(t)),t}if(this.options.audioContext?(console.log("using custom audio context"),this._audioContext=this.options.audioContext):(console.log("using default audio context"),this._audioContext=new AudioContext,this.ownsAudioContext=!0),!this._audioContext)throw this.setErrored("Audio context is null"),Error("Audio context is null");switch(this._audioProcessorAdapterType="auto"==this.options.processorType?"audioWorklet"in this._audioContext&&"function"==typeof AudioWorkletNode?"AudioWorklet":"ScriptProcessor":this.options.processorType,this._audioProcessorAdapterType){case"AudioWorklet":this._vadNode=await f(this.options.baseAssetPath+"vad.worklet.bundle.min.js",this.options.workletOptions,this._audioContext,this.frameSamples,this.processFrame);break;case"ScriptProcessor":this._vadNode=await m(this._audioContext,this.frameSamples,this.processFrame);break;default:throw Error(`Unsupported audio processor adapter type: ${this._audioProcessorAdapterType}`)}this._mediaStreamAudioSourceNode=new MediaStreamAudioSourceNode(this._audioContext,{mediaStream:this._stream}),this._mediaStreamAudioSourceNode.connect(this._vadNode),d.log.debug("started micVAD"),this.listening=!0,this.initializationState="initialized";break;case"initializing":d.log.warn("start called while initializing");break;case"initialized":{if(this.listening)return;this.listening=!0,this.frameProcessor.resume();let{stream:t,audioContext:r,vadNode:i}=this.getAudioInstances();this._stream=await this.options.resumeStream(t);let a=new MediaStreamAudioSourceNode(r,{mediaStream:this._stream});this._mediaStreamAudioSourceNode=a,a.connect(i);break}case"destroyed":d.log.warn("start called after destroyed");break;case"errored":d.log.error("start called after errored");break;default:d.log.warn("weird initialization state")}},this.pause=async()=>{if(!this.listening)return;this.listening=!1;let{stream:t,mediaStreamAudioSourceNode:r}=this.getAudioInstances();await this.options.pauseStream(t),r.disconnect(),this.frameProcessor.pause(this.handleFrameProcessorEvent)},this.destroy=async()=>{d.log.debug("destroy called"),this.initializationState="destroyed";let{vadNode:t}=this.getAudioInstances();t instanceof AudioWorkletNode&&t.port.postMessage(p.Message.SpeechStop),this.listening&&await this.pause(),await this.model.release(),this.ownsAudioContext&&await this._audioContext?.close()},this.setOptions=t=>{this.frameProcessor.setOptions(t)},this.processFrame=async t=>{await this.frameProcessor.process(t,this.handleFrameProcessorEvent)},this.handleFrameProcessorEvent=t=>{switch(t.msg){case p.Message.FrameProcessed:this.options.onFrameProcessed(t.probs,t.frame);break;case p.Message.SpeechStart:this.options.onSpeechStart();break;case p.Message.SpeechRealStart:this.options.onSpeechRealStart();break;case p.Message.VADMisfire:this.options.onVADMisfire();break;case p.Message.SpeechEnd:this.options.onSpeechEnd(t.audio)}}}static async new(t={}){let r,a={...(0,i.getDefaultRealTimeVADOptions)(t.model??i.DEFAULT_MODEL),...t};(0,l.validateOptions)(a),i.ort.env.wasm.wasmPaths=a.onnxWASMBasePath,void 0!==a.ortConfig&&a.ortConfig(i.ort);let s="v5"===a.model?"silero_vad_v5.onnx":"silero_vad_legacy.onnx",n=a.baseAssetPath+s,o="v5"===a.model?c.SileroV5.new:c.SileroLegacy.new;try{r=await o(i.ort,()=>(0,u.defaultModelFetcher)(n))}catch(t){throw console.error(`Encountered an error while loading model file ${n}`),t}let d="v5"===a.model?512:1536,p=new l.FrameProcessor(r.process,r.reset_state,{positiveSpeechThreshold:a.positiveSpeechThreshold,negativeSpeechThreshold:a.negativeSpeechThreshold,redemptionMs:a.redemptionMs,preSpeechPadMs:a.preSpeechPadMs,minSpeechMs:a.minSpeechMs,submitUserSpeechOnPause:a.submitUserSpeechOnPause},d/16),h=new g(a,p,r,d);if(a.startOnLoad)try{await h.start()}catch(t){throw console.error("Error starting micVad",t),t}return h}}i.MicVAD=g},95311,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.getDefaultRealTimeVADOptions=i.MicVAD=i.DEFAULT_MODEL=i.utils=i.NonRealTimeVAD=i.Message=i.FrameProcessor=i.defaultModelFetcher=i.baseAssetPath=void 0;var a=t.r(74574);Object.defineProperty(i,"baseAssetPath",{enumerable:!0,get:function(){return a.baseAssetPath}});var s=t.r(22237);Object.defineProperty(i,"defaultModelFetcher",{enumerable:!0,get:function(){return s.defaultModelFetcher}});var n=t.r(43489);Object.defineProperty(i,"FrameProcessor",{enumerable:!0,get:function(){return n.FrameProcessor}});var o=t.r(42827);Object.defineProperty(i,"Message",{enumerable:!0,get:function(){return o.Message}});var u=t.r(73852);Object.defineProperty(i,"NonRealTimeVAD",{enumerable:!0,get:function(){return u.NonRealTimeVAD}});let l=t.r(84407);i.utils={audioFileToArray:l.audioFileToArray,minFramesForTargetMS:l.minFramesForTargetMS,arrayBufferToBase64:l.arrayBufferToBase64,encodeWAV:l.encodeWAV};var d=t.r(86962);Object.defineProperty(i,"DEFAULT_MODEL",{enumerable:!0,get:function(){return d.DEFAULT_MODEL}}),Object.defineProperty(i,"MicVAD",{enumerable:!0,get:function(){return d.MicVAD}}),Object.defineProperty(i,"getDefaultRealTimeVADOptions",{enumerable:!0,get:function(){return d.getDefaultRealTimeVADOptions}})},33864,(t,r,i)=>{"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.useMicVAD=i.getDefaultReactRealTimeVADOptions=i.utils=void 0;let a=t.r(95311),s=t.r(71645);var n=t.r(95311);Object.defineProperty(i,"utils",{enumerable:!0,get:function(){return n.utils}});let o={userSpeakingThreshold:.6};i.getDefaultReactRealTimeVADOptions=t=>({...(0,a.getDefaultRealTimeVADOptions)(t),...o}),i.useMicVAD=function(t){let r,n,o,u,[l,d]=(r=t.model??a.DEFAULT_MODEL,o={userSpeakingThreshold:(n={...(0,i.getDefaultReactRealTimeVADOptions)(r),...t}).userSpeakingThreshold},u={positiveSpeechThreshold:n.positiveSpeechThreshold,negativeSpeechThreshold:n.negativeSpeechThreshold,redemptionMs:n.redemptionMs,preSpeechPadMs:n.preSpeechPadMs,minSpeechMs:n.minSpeechMs,submitUserSpeechOnPause:n.submitUserSpeechOnPause,onFrameProcessed:n.onFrameProcessed,onVADMisfire:n.onVADMisfire,onSpeechStart:n.onSpeechStart,onSpeechEnd:n.onSpeechEnd,onSpeechRealStart:n.onSpeechRealStart,baseAssetPath:n.baseAssetPath,onnxWASMBasePath:n.onnxWASMBasePath,model:n.model,workletOptions:n.workletOptions,getStream:n.getStream,pauseStream:n.pauseStream,resumeStream:n.resumeStream,startOnLoad:n.startOnLoad,processorType:n.processorType},n.ortConfig&&(u.ortConfig=n.ortConfig),n.audioContext&&(u.audioContext=n.audioContext),[o,u]),p=t.model??a.DEFAULT_MODEL,[c,h]=(0,s.useState)(!1),[f,m]=(0,s.useState)(!0),[g,y]=(0,s.useState)(!1),[_,b]=(0,s.useState)(!1),[$,w]=(0,s.useState)(null),v=(0,s.useRef)(d.onFrameProcessed),x=(0,s.useRef)(d.onSpeechEnd),S=(0,s.useRef)(d.onSpeechStart),T=(0,s.useRef)(d.onSpeechRealStart),E=(0,s.useRef)(d.onVADMisfire),k=(0,s.useRef)(d.getStream);(0,s.useEffect)(()=>{v.current=d.onFrameProcessed,x.current=d.onSpeechEnd,S.current=d.onSpeechStart,T.current=d.onSpeechRealStart,E.current=d.onVADMisfire},[d.onFrameProcessed,d.onSpeechEnd,d.onSpeechStart,d.onSpeechRealStart,d.onVADMisfire]),(0,s.useEffect)(()=>{k.current=d.getStream},[d.getStream]);let I=d.getStream.toString();(0,s.useEffect)(()=>{let t=null,r=!1;return(async()=>{try{m(!0),y(!1);let i={...d,onFrameProcessed:(t,r)=>{let i=t.isSpeech>l.userSpeakingThreshold;h(i),v.current(t,r)},onSpeechEnd:t=>{x.current(t)},onSpeechStart:()=>{S.current()},onSpeechRealStart:()=>{T.current()},onVADMisfire:()=>{E.current()},getStream:()=>k.current()};if(t=await a.MicVAD.new(i),r)return void await t.destroy();w(t),d.startOnLoad&&(await t.start(),b(!0)),m(!1)}catch(t){m(!1),t instanceof Error?y(t.message):y(String(t))}})().catch(()=>{}),function(){r=!0,t&&t.destroy(),f||g||b(!1)}},[I,p]);let C=(0,s.useCallback)(async()=>{f||g||(await $?.pause(),b(!1))},[f,g,$]),z=(0,s.useCallback)(async()=>{f||g||(await $?.start(),b(!0))},[f,g,$]),A=(0,s.useCallback)(async()=>{_?await C():await z()},[_,C,z]);return{listening:_,errored:g,loading:f,userSpeaking:c,pause:C,start:z,toggle:A}}},40296,t=>{"use strict";var r=t.i(47167),i=t.i(43476),a=t.i(71645),s=t.i(18566),n=t.i(33864);t.s(["default",0,function(){let t=(0,s.useParams)(),o=(0,s.useRouter)(),u=t.id,[l,d]=(0,a.useState)([]),[p,c]=(0,a.useState)(null),[h,f]=(0,a.useState)(!1),[m,g]=(0,a.useState)(""),[y,_]=(0,a.useState)(!1),b=(0,a.useRef)(null),$=(0,a.useRef)(null),w=(0,a.useRef)(null),v=(0,a.useRef)([]),x=(0,a.useRef)(!1),S=(0,a.useRef)(null),T=(0,a.useRef)(null),E=(0,a.useRef)({});(0,a.useEffect)(()=>{b.current?.scrollIntoView({behavior:"smooth"})},[l,m]),(0,a.useEffect)(()=>{if(!y)return;navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then(t=>{$.current&&($.current.srcObject=t,$.current.play())}).catch(t=>console.error("Camera error:",t)),T.current=new Worker(new URL("/workers/behaviorWorker.ts",window.location.origin)),T.current.onmessage=async t=>{if("incident"===t.data.type){let i=t.data.kind,a=Date.now();if(a-(E.current[i]||0)>6e4&&(E.current[i]=a,console.log(`Incident detected: ${i}. Taking snapshot...`),$.current&&w.current)){let t=w.current.getContext("2d");t&&(t.drawImage($.current,0,0,320,240),w.current.toBlob(async t=>{if(!t)return;let a=new FormData;a.append("session_id",u),a.append("incident_type",i),a.append("file",t,"snapshot.jpg");try{await fetch(`${r.default.env.NEXT_PUBLIC_API_URL||"http://localhost:8000"}/behavior/incident`,{method:"POST",body:a}),console.log(`Incident ${i} uploaded to server.`)}catch(t){console.error("Incident upload failed:",t)}},"image/jpeg",.8))}}};let t=setInterval(()=>{if($.current&&w.current){let t=w.current.getContext("2d");t&&(t.drawImage($.current,0,0,320,240),createImageBitmap(t.getImageData(0,0,320,240)).then(t=>{T.current?.postMessage({type:"process_frame",frame:t},[t])}))}},1e3);return()=>{clearInterval(t),T.current?.terminate(),$.current?.srcObject&&$.current.srcObject.getTracks().forEach(t=>t.stop())}},[y,u]);let k=(0,a.useCallback)(()=>{if(!y)return null;let t=new WebSocket((r.default.env.NEXT_PUBLIC_API_URL||"http://localhost:8000").replace(/^http/,"ws")+`/ws/session/${u}`);return t.onopen=()=>{console.log("Connected to session"),c(t);let r=setInterval(()=>{t.readyState===WebSocket.OPEN&&t.send(JSON.stringify({type:"ping"}))},3e4);t.addEventListener("close",()=>clearInterval(r))},t.onmessage=t=>{try{let r=JSON.parse(t.data);"chunk"===r.type?(f(!0),g(t=>t+r.text)):"audio"===r.type?(v.current.push(r.data),I()):"turn_end"===r.type&&(d(t=>[...t,{role:"teacher",text:m}]),g(""))}catch(t){console.error("WS parse error:",t)}},t.onclose=()=>{console.log("WebSocket disconnected. Reconnecting in 2 seconds..."),c(null),setTimeout(()=>{k()},2e3)},t},[u,m,y]);(0,a.useEffect)(()=>{if(y){let t=k();return()=>{t&&(t.onclose=null,t.close())}}},[k,y]);let I=async()=>{if(x.current||0===v.current.length)return;x.current=!0,f(!0);let t=v.current.shift();if(t)try{if("MOCK_BASE64_AUDIO_DATA"===t)await new Promise(t=>setTimeout(t,1e3));else{let r=`data:audio/mp3;base64,${t}`,i=new Audio(r);await new Promise(t=>{i.onended=t,i.play()})}}catch(t){console.error("Audio playback failed",t)}finally{x.current=!1,v.current.length>0?I():(f(!1),z())}},C=(0,n.useMicVAD)({startOnLoad:!0,onSpeechStart:()=>{console.log("User started speaking")},onSpeechEnd:async t=>{if(h)return;console.log("User finished speaking, uploading...");let i=function(t){let r=new DataView(new ArrayBuffer(44+2*t.length)),i=(t,r,i)=>{for(let a=0;a<i.length;a++)t.setUint8(r+a,i.charCodeAt(a))};i(r,0,"RIFF"),r.setUint32(4,36+2*t.length,!0),i(r,8,"WAVE"),i(r,12,"fmt "),r.setUint32(16,16,!0),r.setUint16(20,1,!0),r.setUint16(22,1,!0),r.setUint32(24,16e3,!0),r.setUint32(28,32e3,!0),r.setUint16(32,2,!0),r.setUint16(34,16,!0),i(r,36,"data"),r.setUint32(40,2*t.length,!0);let a=44;for(let i=0;i<t.length;i++,a+=2){let s=Math.max(-1,Math.min(1,t[i]));r.setInt16(a,s<0?32768*s:32767*s,!0)}return new Blob([r],{type:"audio/wav"})}(t),a=new FormData;a.append("file",i,"recording.wav");try{let t=await fetch(`${r.default.env.NEXT_PUBLIC_API_URL}/voice/transcribe`,{method:"POST",body:a}),i=(await t.json()).text;i&&i.trim().length>0&&p&&p.readyState===WebSocket.OPEN&&p.send(JSON.stringify({type:"student_text",text:i}))}catch(t){console.error("Transcription error:",t)}},positiveSpeechThreshold:.8}),z=()=>{S.current&&clearTimeout(S.current),S.current=setTimeout(()=>{!p||p.readyState!==WebSocket.OPEN||C.userSpeaking||h||(console.log("8 seconds of silence, triggering WAIT state"),p.send(JSON.stringify({type:"silence_timeout"})))},8e3)};return((0,a.useEffect)(()=>{C.userSpeaking?S.current&&clearTimeout(S.current):!h&&y&&z()},[C.userSpeaking,h,y]),y)?(0,i.jsxs)("div",{className:"flex flex-col h-screen bg-black text-white overflow-hidden relative",children:[(0,i.jsx)("div",{className:"bg-red-600/90 text-white text-center py-1.5 text-xs font-bold uppercase tracking-widest absolute top-0 left-0 right-0 z-50",children:"Camera active — behavior is being monitored"}),(0,i.jsxs)("div",{className:"absolute top-12 right-4 md:right-8 z-40",children:[(0,i.jsx)("div",{className:"w-4 h-4 rounded-full bg-green-500 md:hidden absolute -top-1 -right-1 border-2 border-black"}),(0,i.jsxs)("div",{className:"hidden md:block w-32 h-24 md:w-48 md:h-36 bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-800 shadow-2xl relative",children:[(0,i.jsx)("video",{ref:$,className:"w-full h-full object-cover",muted:!0,playsInline:!0}),(0,i.jsxs)("div",{className:"absolute bottom-2 left-2 flex items-center space-x-1",children:[(0,i.jsx)("div",{className:"w-2 h-2 bg-red-500 rounded-full animate-pulse"}),(0,i.jsx)("span",{className:"text-[10px] uppercase font-bold text-white drop-shadow-md",children:"Rec"})]})]})]}),(0,i.jsx)("canvas",{ref:w,width:"320",height:"240",className:"hidden"}),(0,i.jsx)("main",{className:"flex-1 overflow-y-auto p-6 md:p-12 pb-32 max-w-4xl w-full mt-10",children:(0,i.jsxs)("div",{className:"space-y-6",children:[l.map((t,r)=>(0,i.jsx)("div",{className:`flex ${"student"===t.role?"justify-end":"justify-start"}`,children:(0,i.jsxs)("div",{className:`p-5 rounded-3xl max-w-[85%] ${"student"===t.role?"bg-indigo-600/20 text-indigo-100 rounded-br-sm border border-indigo-500/30":"bg-gray-800/50 text-gray-100 rounded-bl-sm border border-gray-700/50"}`,children:[(0,i.jsx)("div",{className:"text-[10px] uppercase tracking-wider opacity-50 mb-2 font-bold",children:"student"===t.role?"You":"AI Tutor"}),(0,i.jsx)("div",{className:"text-lg md:text-xl leading-relaxed",children:t.text})]})},r)),m&&(0,i.jsx)("div",{className:"flex justify-start",children:(0,i.jsxs)("div",{className:"p-5 rounded-3xl max-w-[85%] bg-gray-800/50 text-gray-100 rounded-bl-sm border border-gray-700/50 backdrop-blur-sm",children:[(0,i.jsx)("div",{className:"text-[10px] uppercase tracking-wider opacity-50 mb-2 font-bold",children:"AI Tutor"}),(0,i.jsxs)("div",{className:"text-lg md:text-xl leading-relaxed",children:[m,(0,i.jsx)("span",{className:"inline-block w-2 h-5 ml-1 bg-white animate-pulse"})]})]})}),(0,i.jsx)("div",{ref:b,className:"h-10"})]})}),(0,i.jsx)("footer",{className:"absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent",children:(0,i.jsxs)("div",{className:"max-w-4xl mx-auto flex items-center justify-between",children:[(0,i.jsxs)("div",{className:"flex flex-col",children:[(0,i.jsx)("div",{className:"flex items-center space-x-1 h-12 mb-2",children:[...Array(15)].map((t,r)=>(0,i.jsx)("div",{className:`w-1.5 rounded-full transition-all duration-150 ${C.userSpeaking?"bg-indigo-500 h-full animate-bounce":h?"bg-blue-400 h-8 animate-pulse":"bg-gray-700 h-2"}`,style:{animationDelay:`${.05*r}s`,height:C.userSpeaking?`${Math.max(20,100*Math.random())}%`:h?`${Math.max(40,80*Math.random())}%`:"8px"}},r))}),(0,i.jsx)("span",{className:"text-xs font-bold tracking-widest uppercase text-gray-400",children:C.userSpeaking?"Listening...":h?"Speaking...":"Waiting for you to speak"})]}),(0,i.jsx)("button",{onClick:()=>{p&&p.readyState===WebSocket.OPEN&&p.send(JSON.stringify({type:"end_session"})),o.push(`/session/${u}/summary`)},className:"px-6 py-3 bg-red-600/20 text-red-400 font-bold rounded-xl border border-red-500/30 hover:bg-red-600/40 hover:text-white transition shadow-lg",children:"End Session"})]})})]}):(0,i.jsx)("div",{className:"flex items-center justify-center h-screen bg-gray-100",children:(0,i.jsxs)("div",{className:"bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center",children:[(0,i.jsx)("h2",{className:"text-2xl font-bold mb-4 text-red-600",children:"Camera Access Required"}),(0,i.jsx)("p",{className:"mb-6 text-gray-600 text-sm",children:'By clicking "I Agree", you consent to having your camera and microphone activated during this session. Your behavior is monitored for attention tracking. Raw video is processed entirely on your device and is NEVER sent to our servers. Low-resolution snapshots are only captured and sent to your parents if you look away for an extended period.'}),(0,i.jsx)("button",{onClick:()=>{_(!0)},className:"w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition",children:"I Agree — Start Session"})]})})}],40296)}]);