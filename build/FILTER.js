/** http://github.com/foo123/FILTER.js
**
** Image Processing Filter Library for javascript and HTML5 canvas element by Nikos M.
** http://nikos-web-development-netai.net/
**/
var FILTER=FILTER||{};FILTER.Filter=function(a){this.image=a};FILTER.Filter.prototype.apply=function(){};FILTER.Image=function(a,b){this.height=this.width=0;this.image=null;this.canvasElement=document.createElement("canvas");this.context=this.canvasElement.getContext("2d");typeof a!=void 0&&this.setImage(a,b)};
FILTER.blendModes={normal:function(a){return a},lighten:function(a,b){return b>a?b:a},darken:function(a,b){return b>a?a:b},multiply:function(a,b){return a*b/255},average:function(a,b){return(a+b)/2},add:function(a,b){return Math.min(255,a+b)},substract:function(a,b){return a+b<255?0:a+b-255},difference:function(a,b){return Math.abs(a-b)},negation:function(a,b){return 255-Math.abs(255-a-b)},screen:function(a,b){return 255-((255-a)*(255-b)>>8)},exclusion:function(a,b){return a+b-2*a*b/255},overlay:function(a,
b){return b<128?2*a*b/255:255-2*(255-a)*(255-b)/255},softLight:function(a,b){return b<128?2*((a>>1)+64)*(b/255):255-2*(255-((a>>1)+64))*(255-b)/255},hardLight:function(a,b){return blendingModes.overlay(b,a)},colorDodge:function(a,b){return b==255?b:Math.min(255,(a<<8)/(255-b))},colorBurn:function(a,b){return b==0?b:Math.max(0,255-(255-a<<8)/b)},linearDodge:function(a,b){return blendingModes.add(a,b)},linearBurn:function(a,b){return blendingModes.substract(a,b)},linearLight:function(a,b){return b<
128?blendingModes.linearBurn(a,2*b):blendingModes.linearDodge(a,2*(b-128))},vividLight:function(a,b){return b<128?blendingModes.colorBurn(a,2*b):blendingModes.colorDodge(a,2*(b-128))},pinLight:function(a,b){return b<128?blendingModes.darken(a,2*b):blendingModes.lighten(a,2*(b-128))},hardMix:function(a,b){return blendingModes.vividLight(a,b)<128?0:255},reflect:function(a,b){return b==255?b:Math.min(255,a*a/(255-b))},glow:function(a,b){return blendingModes.reflect(b,a)},phoenix:function(a,b){return Math.min(a,
b)-Math.max(a,b)+255}};FILTER.Image.prototype.blend=function(a,b,c){typeof b=="undefined"&&(b="normal");typeof c=="undefined"&&(c=1);c>1&&(c=1);c<0&&(c=0);for(var b=FILTER.blendModes[b],e=this.getPixelData(),d=a.getPixelData(),a=e.data,d=d.data,f,n,o,k,r,s,l=1-c,m=Math.min(a.length,d.length),h=0;h<m;h+=4)k=a[h],r=a[h+1],s=a[h+2],f=b(d[h],k),n=b(d[h+1],r),o=b(d[h+2],s),a[h]=f*c+k*l,a[h+1]=n*c+r*l,a[h+2]=o*c+s*l;this.setPixelData(e)};
FILTER.Image.prototype.clone=function(a){typeof a=="undefined"&&(a=!1);var b=new FILTER.Image;this.image!=void 0&&this.image!=null&&a?b.setImage(this.image.src):(b.setWidth(this.width),b.setHeight(this.height),b.setPixelData(this.getPixelData()));return b};FILTER.Image.prototype.createImageData=function(a,b){this.width=a;this.height=b;this.canvasElement.width=this.width;this.canvasElement.height=this.height;this.context=this.canvasElement.getContext("2d");return this.context.createImageData(a,b)};
FILTER.Image.prototype.getPixelData=function(){return this.context.getImageData(0,0,this.width,this.height)};FILTER.Image.prototype.setPixelData=function(a){this.context.putImageData(a,0,0)};FILTER.Image.prototype.setWidth=function(a){this.width=a;this.canvasElement.width=this.width;this.context=this.canvasElement.getContext("2d")};FILTER.Image.prototype.setHeight=function(a){this.height=a;this.canvasElement.height=this.height;this.context=this.canvasElement.getContext("2d")};
FILTER.Image.prototype.setImage=function(a,b){var c=this;a instanceof Image?(this.image=a,this.width=a.width,this.height=a.height,this.canvasElement.width=this.width,this.canvasElement.height=this.height,this.context=this.canvasElement.getContext("2d"),this.context.drawImage(this.image,0,0)):(this.image=new Image,this.image.onload=function(){c.width=c.image.width;c.height=c.image.height;c.canvasElement.width=c.width;c.canvasElement.height=c.height;c.context=c.canvasElement.getContext("2d");c.context.drawImage(c.image,
0,0);typeof b!="undefined"&&b.call(this)},this.image.src=a);this.image.crossOrigin=""};FILTER.ColorMatrixFilter=function(a,b){this.matrix=[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0];this.image=a;typeof b!="undefined"&&this.concat(b)};FILTER.ColorMatrixFilter.prototype=new FILTER.Filter;FILTER.ColorMatrixFilter.prototype.constructor=FILTER.ColorMatrixFilter;
FILTER.ColorMatrixFilter.prototype.concat=function(a){var b=[],c=0,e,d;for(d=0;d<4;d++){for(e=0;e<5;e++)b[c+e]=a[c]*this.matrix[e]+a[c+1]*this.matrix[e+5]+a[c+2]*this.matrix[e+10]+a[c+3]*this.matrix[e+15]+(e==4?a[c+4]:0);c+=5}this.matrix=b};
FILTER.ColorMatrixFilter.prototype.apply=function(){for(var a=this.image.getPixelData(),b=a.data,c=this.matrix,e=0;e<b.length;e+=4){var d=[b[e],b[e+1],b[e+2],b[e+3]];b[e]=c[0]*d[0]+c[1]*d[1]+c[2]*d[2]+c[3]*d[3]+c[4];b[e+1]=c[5]*d[0]+c[6]*d[1]+c[7]*d[2]+c[8]*d[3]+c[9];b[e+2]=c[10]*d[0]+c[11]*d[1]+c[12]*d[2]+c[13]*d[3]+c[14];b[e+3]=c[15]*d[0]+c[16]*d[1]+c[17]*d[2]+c[18]*d[3]+c[19]}this.image.setPixelData(a)};FILTER.LUMA_R=0.212671;FILTER.LUMA_G=0.71516;FILTER.LUMA_B=0.072169;
FILTER.ColorMatrixFilter.prototype.grayscale=function(){var a=FILTER.LUMA_R,b=FILTER.LUMA_G,c=FILTER.LUMA_B;this.concat([a,b,c,0,0,a,b,c,0,0,a,b,c,0,0,0,0,0,1,0]);return this};FILTER.ColorMatrixFilter.prototype.desaturate=function(){this.concat([FILTER.LUMA_R,FILTER.LUMA_G,FILTER.LUMA_B,0,0,FILTER.LUMA_R,FILTER.LUMA_G,FILTER.LUMA_B,0,0,FILTER.LUMA_R,FILTER.LUMA_G,FILTER.LUMA_B,0,0,0,0,0,1,0]);return this};
FILTER.ColorMatrixFilter.prototype.colorize=function(a,b){var c,e,d,f;typeof b=="undefined"&&(b=1);c=(a>>16&255)/255;e=(a>>8&255)/255;d=(a&255)/255;f=1-b;this.concat([f+b*c*FILTER.LUMA_R,b*c*FILTER.LUMA_G,b*c*FILTER.LUMA_B,0,0,b*e*FILTER.LUMA_R,f+b*e*FILTER.LUMA_G,b*e*FILTER.LUMA_B,0,0,b*d*FILTER.LUMA_R,b*d*FILTER.LUMA_G,f+b*d*FILTER.LUMA_B,0,0,0,0,0,1,0]);return this};FILTER.ColorMatrixFilter.prototype.invert=function(){this.concat([-1,0,0,0,255,0,-1,0,0,255,0,0,-1,0,255,0,0,0,1,0]);return this};
FILTER.ColorMatrixFilter.prototype.saturation=function(a){var b,c,e;b=1-a;c=b*FILTER.LUMA_R;e=b*FILTER.LUMA_G;b*=FILTER.LUMA_B;this.concat([c+a,e,b,0,0,c,e+a,b,0,0,c,e,b+a,0,0,0,0,0,1,0]);return this};FILTER.ColorMatrixFilter.prototype.contrast=function(a,b,c){typeof b=="undefined"&&(b=a);typeof c=="undefined"&&(c=a);a+=1;b+=1;c+=1;this.concat([a,0,0,0,128*(1-a),0,b,0,0,128*(1-b),0,0,c,0,128*(1-c),0,0,0,1,0]);return this};
FILTER.ColorMatrixFilter.prototype.brightness=function(a,b,c){typeof b=="undefined"&&(b=a);typeof c=="undefined"&&(c=a);this.concat([1,0,0,0,a,0,1,0,0,b,0,0,1,0,c,0,0,0,1,0]);return this};
FILTER.ColorMatrixFilter.prototype.adjustHue=function(a){a*=Math.PI/180;var b=Math.cos(a),a=Math.sin(a);this.concat([FILTER.LUMA_R+b*(1-FILTER.LUMA_R)+a*-FILTER.LUMA_R,FILTER.LUMA_G+b*-FILTER.LUMA_G+a*-FILTER.LUMA_G,FILTER.LUMA_B+b*-FILTER.LUMA_B+a*(1-FILTER.LUMA_B),0,0,FILTER.LUMA_R+b*-FILTER.LUMA_R+a*0.143,FILTER.LUMA_G+b*(1-FILTER.LUMA_G)+a*0.14,FILTER.LUMA_B+b*-FILTER.LUMA_B+a*-0.283,0,0,FILTER.LUMA_R+b*-FILTER.LUMA_R+a*-(1-FILTER.LUMA_R),FILTER.LUMA_G+b*-FILTER.LUMA_G+a*FILTER.LUMA_G,FILTER.LUMA_B+
b*(1-FILTER.LUMA_B)+a*FILTER.LUMA_B,0,0,0,0,0,1,0]);return this};FILTER.ColorMatrixFilter.prototype.blend=function(a,b){for(var c=1-b,e=0;e<20;)this.matrix[e]=c*this.matrix[e]+b*a.matrix[e],e++};FILTER.ColorMatrixFilter.prototype.average=function(a,b,c){typeof a=="undefined"&&(a=1/3);typeof b=="undefined"&&(b=1/3);typeof c=="undefined"&&(c=1/3);this.concat([a,b,c,0,0,a,b,c,0,0,a,b,c,0,0,0,0,0,1,0])};
FILTER.ColorMatrixFilter.prototype.threshold=function(a,b){typeof b=="undefined"&&(b=256);this.concat([FILTER.LUMA_R*b,FILTER.LUMA_G*b,FILTER.LUMA_B*b,0,-(b-1)*a,FILTER.LUMA_R*b,FILTER.LUMA_G*b,FILTER.LUMA_B*b,0,-(b-1)*a,FILTER.LUMA_R*b,FILTER.LUMA_G*b,FILTER.LUMA_B*b,0,-(b-1)*a,0,0,0,1,0])};FILTER.ColorMatrixFilter.prototype.threshold_rgb=function(a,b){typeof b=="undefined"&&(b=256);this.concat([b,0,0,0,-(b-1)*a,0,b,0,0,-(b-1)*a,0,0,b,0,-(b-1)*a,0,0,0,1,0])};
FILTER.ColorMatrixFilter.prototype.threshold_alpha=function(a,b){typeof a=="undefined"&&(a=0.5);typeof b=="undefined"&&(b=256);this.concat([1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,b,-b*a])};FILTER.ConvolutionMatrixFilter=function(a,b,c){this.image=a;if(typeof b!="undefined")this.weights=b;this.opaque=!0;if(typeof c!="undefined")this.opaque=c};FILTER.ConvolutionMatrixFilter.prototype=new FILTER.Filter;FILTER.ConvolutionMatrixFilter.prototype.constructor=FILTER.ConvolutionMatrixFilter;
FILTER.ConvolutionMatrixFilter.prototype.apply=function(){for(var a=Math.round(Math.sqrt(this.weights.length)),b=Math.floor(a/2),c=this.image.getPixelData(),e=c.data,d=c.width,c=c.height,f=this.image.clone().getPixelData(),n=this.opaque?1:0,o=0;o<c;o++)for(var k=0;k<d;k++){for(var r=o,s=k,l=(o*d+k)*4,m=0,h=0,j=0,i=0,g=0;g<a;g++)for(var t=0;t<a;t++){var p=r+g-b,q=s+t-b;p>=0&&p<c&&q>=0&&q<d&&(p=(p*d+q)*4,q=this.weights[g*a+t],m+=e[p]*q,h+=e[p+1]*q,j+=e[p+2]*q,i+=e[p+3]*q)}f.data[l]=m;f.data[l+1]=h;
f.data[l+2]=j;f.data[l+3]=i+n*(255-i)}this.image.setPixelData(f)};FILTER.ConvolutionMatrixFilter.prototype.blur=function(){var a=1/9;this.weights=[a,a,a,a,a,a,a,a,a];return this};FILTER.ConvolutionMatrixFilter.prototype.blur4=function(){this.weights=[0.0625,0.0625,0.0625,0.0625,0.0625,0.0625,0.0625,0.0625,0.0625,0.0625,0.0625,0.0625,0.0625,0.0625,0.0625,0.0625];return this};FILTER.ConvolutionMatrixFilter.prototype.sharpen=function(){this.weights=[-1,-1,-1,-1,9,-1,-1,-1,-1];return this};
FILTER.ConvolutionMatrixFilter.prototype.gauss=function(){this.weights=[0.0625,0.125,0.0625,0.125,0.25,0.125,0.0625,0.125,0.0625];return this};FILTER.ConvolutionMatrixFilter.prototype.laplace=function(){this.weights=[0,1,0,1,-4,1,0,1,0];return this};FILTER.ConvolutionMatrixFilter.prototype.emboss=function(){this.weights=[-2,-1,0,-1,1,1,0,1,2];return this};FILTER.ConvolutionMatrixFilter.prototype.edge=function(){this.weights=[0,1,0,1,-4,1,0,1,0];return this};
FILTER.ConvolutionMatrixFilter.prototype.motionblur=function(a){var b=1/9;this.weights=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];if(a==0)for(a=0;a<9;a++)this.weights[36+a]=b;else if(a==2)for(a=0;a<9;a++)this.weights[9*a+5]=b;else if(a==1)for(a=0;a<9;a++)this.weights[9*Math.round(a)+Math.round(a)]=b;return this};
FILTER.DisplacementMapFilter=function(a,b){this.scaleY=this.scaleX=1;this.color=this.componentY=this.componentX=this.startY=this.startX=0;this.mode=FILTER.DisplacementMapFilter.CLAMP;this.image=a;this.map=b};FILTER.CHANNEL_RED=0;FILTER.CHANNEL_GREEN=1;FILTER.CHANNEL_BLUE=2;FILTER.CHANNEL_ALPHA=3;FILTER.MODE_IGNORE=0;FILTER.MODE_WRAP=1;FILTER.MODE_CLAMP=2;FILTER.MODE_COLOR=4;FILTER.DisplacementMapFilter.prototype=new FILTER.Filter;FILTER.DisplacementMapFilter.prototype.constructor=FILTER.DisplacementMapFilter;
FILTER.DisplacementMapFilter.prototype.apply=function(){for(var a=this.image.getPixelData(),b=a.width,c=this.map.clone().getPixelData(),e=c.data,d=c.width,c=c.height,f=this.image.clone().getPixelData(),n=this.scaleX/256,o=this.scaleY/256,k=this.color>>24&255,r=this.color>>16&255,s=this.color>>8&255,l=this.color&255,m=0;m<c;m++)for(var h=0;h<d;h++){var j=((m+this.startY)*b+(h+this.startX))*4,i=(m*d+h)*4,g=m+this.startY+Math.floor((e[i+this.componentY]-128)*o),i=h+this.startX+Math.floor((e[i+this.componentX]-
128)*n);if(g>=a.height||g<0||i>=a.width||i<0)switch(this.mode){case FILTER.MODE_IGNORE:continue;case FILTER.MODE_COLOR:f.data[j]=r;f.data[j+1]=s;f.data[j+2]=l;f.data[j+3]=k;continue;case FILTER.MODE_WRAP:g>=a.height&&(g-=a.height);g<0&&(g+=a.height);i>=a.width&&(i-=a.width);i<0&&(i+=a.width);break;default:g>=a.height&&(g=a.height-1),g<0&&(g=0),i>=a.width&&(i=a.width-1),i<0&&(i=0)}g=(g*b+i)*4;f.data[j]=a.data[g];f.data[j+1]=a.data[g+1];f.data[j+2]=a.data[g+2];f.data[j+3]=a.data[g+3]}this.image.setPixelData(f)};
FILTER.SobelFilter=function(a){this.image=a};FILTER.SobelFilter.prototype=new FILTER.Filter;FILTER.SobelFilter.prototype.constructor=FILTER.SobelFilter;
FILTER.SobelFilter.prototype.apply=function(){(new FILTER.ColorMatrixFilter(this.image)).grayscale().apply();var a=this.image.getPixelData();(new FILTER.ConvolutionMatrixFilter(this.image,[-1,0,1,-2,0,2,-1,0,1])).apply();var b=this.image.getPixelData();this.image.setPixelData(a);(new FILTER.ConvolutionMatrixFilter(this.image,[-1,-2,-1,0,0,0,1,2,1])).apply();for(var c=this.image.getPixelData(),e=[],d=0;d<a.data.length;d+=4){var f=Math.abs(b.data[d]);e[d]=f;var n=Math.abs(c.data[d]);e[d+1]=n;e[d+2]=
(f+n)/4;e[d+3]=255}a=this.image.getPixelData();for(d=0;d<a.data.length;d++)a.data[d]=e[d];this.image.setPixelData(a,0,0)};