import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js";

gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector("#webgl");
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x05070d, 0.055);

const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0, 9);

const renderer = new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:"high-performance"});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const root = new THREE.Group();
scene.add(root);
const cyan = 0x67f2ff, blue = 0x356bff, violet = 0x7a5cff;
const coreMaterial = new THREE.MeshPhysicalMaterial({color:0x0d1822,metalness:.85,roughness:.25,emissive:0x0b3940,emissiveIntensity:.7,clearcoat:1,clearcoatRoughness:.15});
const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.45,3),coreMaterial); root.add(core);
const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.52,2),new THREE.MeshBasicMaterial({color:cyan,wireframe:true,transparent:true,opacity:.12})); root.add(wire);
const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(.82,2),new THREE.MeshBasicMaterial({color:cyan,wireframe:true,transparent:true,opacity:.24})); root.add(inner);

function makeRing(radius,tube,color,tiltX,tiltY){const mesh=new THREE.Mesh(new THREE.TorusGeometry(radius,tube,12,170),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.45}));mesh.rotation.set(tiltX,tiltY,0);root.add(mesh);return mesh}
const ringA=makeRing(2.1,.012,cyan,Math.PI/2.8,.2), ringB=makeRing(2.5,.009,blue,Math.PI/2.1,-.7), ringC=makeRing(2.9,.008,violet,-.4,Math.PI/2.5);

const satellites=[];
[[2.55,.2,.15,cyan],[-2.2,.7,-.6,blue],[1.1,-2.25,.4,violet]].forEach(([x,y,z,color],index)=>{const group=new THREE.Group();const orb=new THREE.Mesh(new THREE.OctahedronGeometry(.23+index*.035,0),new THREE.MeshStandardMaterial({color:0x0d1822,emissive:color,emissiveIntensity:1.3,metalness:.75,roughness:.28}));const orbit=new THREE.Mesh(new THREE.TorusGeometry(.48,.008,8,64),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.55}));orbit.rotation.x=Math.PI/2;group.add(orb,orbit);group.position.set(x,y,z);root.add(group);satellites.push(group)});

const particleCount=innerWidth<700?900:1700, particlePositions=new Float32Array(particleCount*3);
for(let i=0;i<particleCount;i++){const r=7+Math.random()*18,theta=Math.random()*Math.PI*2,phi=Math.acos(2*Math.random()-1);particlePositions[i*3]=r*Math.sin(phi)*Math.cos(theta);particlePositions[i*3+1]=r*Math.sin(phi)*Math.sin(theta);particlePositions[i*3+2]=r*Math.cos(phi)}
const particlesGeo=new THREE.BufferGeometry();particlesGeo.setAttribute("position",new THREE.BufferAttribute(particlePositions,3));const particles=new THREE.Points(particlesGeo,new THREE.PointsMaterial({color:0x7bdcff,size:.025,transparent:true,opacity:.55,depthWrite:false}));scene.add(particles);
scene.add(new THREE.AmbientLight(0x497d96,.9));const key=new THREE.PointLight(cyan,45,16,2);key.position.set(2.8,3.5,4);scene.add(key);const rim=new THREE.PointLight(blue,32,12,2);rim.position.set(-4,-1,2);scene.add(rim);

const pointer=new THREE.Vector2(),pointerTarget=new THREE.Vector2();let drag=false,previous={x:0,y:0},dragRotation={x:0,y:0};
window.addEventListener("pointermove",e=>{pointerTarget.x=(e.clientX/innerWidth-.5)*2;pointerTarget.y=-(e.clientY/innerHeight-.5)*2;const aura=document.querySelector(".cursor-aura");if(aura){aura.style.left=`${e.clientX}px`;aura.style.top=`${e.clientY}px`}if(drag){dragRotation.y+=(e.clientX-previous.x)*.004;dragRotation.x+=(e.clientY-previous.y)*.004;previous={x:e.clientX,y:e.clientY}}});
window.addEventListener("pointerdown",e=>{drag=true;previous={x:e.clientX,y:e.clientY};document.body.style.cursor="grabbing"});
window.addEventListener("pointerup",()=>{drag=false;document.body.style.cursor=""});

const clock=new THREE.Clock();
function animate(){const t=clock.getElapsedTime();pointer.lerp(pointerTarget,.05);root.rotation.x+=((pointer.y*.13+dragRotation.x)-root.rotation.x)*.035;root.rotation.y+=((pointer.x*.18+dragRotation.y)-root.rotation.y)*.035;core.rotation.x+=.0018;core.rotation.y+=.0024;wire.rotation.x-=.001;wire.rotation.y+=.0017;inner.rotation.y-=.004;ringA.rotation.z+=.0018;ringB.rotation.z-=.0013;ringC.rotation.z+=.001;particles.rotation.y=t*.008;satellites.forEach((sat,i)=>{sat.rotation.y+=.004+i*.001;sat.rotation.z-=.002});renderer.render(scene,camera);requestAnimationFrame(animate)}animate();

const sceneStates={hero:{cam:[0,0,9],root:[1.9,.1,0],scale:1.05},vision:{cam:[0,.4,7],root:[2.7,-.4,-1],scale:.78},worlds:{cam:[0,0,6.4],root:[0,.7,-1.8],scale:.72},signal:{cam:[0,.1,6],root:[-2.6,-.4,-1.6],scale:.82},enter:{cam:[0,0,5.1],root:[0,0,-2.1],scale:1.15}};
function transitionTo(state){gsap.to(camera.position,{x:state.cam[0],y:state.cam[1],z:state.cam[2],duration:1.35,ease:"power3.inOut"});gsap.to(root.position,{x:state.root[0],y:state.root[1],z:state.root[2],duration:1.35,ease:"power3.inOut"});gsap.to(root.scale,{x:state.scale,y:state.scale,z:state.scale,duration:1.35,ease:"power3.inOut"})}
const sceneSections=[...document.querySelectorAll("[data-scene]")];
sceneSections.forEach(section=>{const state=sceneStates[section.dataset.scene];ScrollTrigger.create({trigger:section,start:"top 55%",end:"bottom 45%",onEnter:()=>transitionTo(state),onEnterBack:()=>transitionTo(state),onUpdate:self=>{const depth=Math.round((self.progress+sceneSections.indexOf(section))*250),depthEl=document.querySelector("#depthValue");if(depthEl)depthEl.textContent=String(depth).padStart(3,"0")}})});

gsap.utils.toArray(".hero-copy, .hero-hud, .copy-block, .data-stack article, .worlds-heading, .world-card, .signal-copy, .signal-console, .enter-inner > *").forEach(el=>{gsap.fromTo(el,{y:42,opacity:0},{y:0,opacity:1,duration:.9,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%",once:true}})});

document.querySelectorAll(".world-card").forEach((card,index)=>{card.addEventListener("mouseenter",()=>{const s=satellites[index];if(s)gsap.to(s.scale,{x:1.7,y:1.7,z:1.7,duration:.35})});card.addEventListener("mouseleave",()=>{const s=satellites[index];if(s)gsap.to(s.scale,{x:1,y:1,z:1,duration:.35})});card.querySelector("button")?.addEventListener("click",()=>{document.querySelectorAll(".world-card").forEach(c=>c.classList.remove("is-focused"));card.classList.add("is-focused");gsap.to(root.rotation,{y:index*1.7,x:.15-index*.12,duration:1,ease:"power3.inOut"})})});

document.querySelector("#pulseButton")?.addEventListener("click",()=>{gsap.to(core.scale,{x:1.3,y:1.3,z:1.3,duration:.18,yoyo:true,repeat:3,ease:"power2.inOut"});gsap.to(coreMaterial,{emissiveIntensity:2.8,duration:.2,yoyo:true,repeat:5})});

const enterButton=document.querySelector("#enterButton"),terminal=document.querySelector("#terminal");let terminalBusy=false;
enterButton?.addEventListener("click",()=>{if(terminalBusy)return;terminalBusy=true;const lines=["> AUTHENTICATING SIGNAL...","> CALIBRATING SPATIAL CORE...","> LINKING 2,048 NEXUS NODES...","> ACCESS GRANTED // WELCOME TO TECHFEST."];terminal.textContent="";let i=0;const next=()=>{if(i>=lines.length){terminalBusy=false;return}terminal.textContent=lines[i++];setTimeout(next,650)};next();gsap.to(root.scale,{x:1.7,y:1.7,z:1.7,duration:.6,yoyo:true,repeat:1,ease:"expo.inOut"});gsap.to(camera.position,{z:4.2,duration:.6,yoyo:true,repeat:1,ease:"expo.inOut"})});

const menuBtn=document.querySelector(".menu-btn"),mobileNav=document.querySelector(".mobile-nav");menuBtn?.addEventListener("click",()=>{const open=menuBtn.classList.toggle("open");mobileNav?.classList.toggle("open",open);menuBtn.setAttribute("aria-expanded",String(open));mobileNav?.setAttribute("aria-hidden",String(!open))});mobileNav?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{mobileNav.classList.remove("open");menuBtn?.classList.remove("open");menuBtn?.setAttribute("aria-expanded","false");mobileNav.setAttribute("aria-hidden","true")}));
window.addEventListener("resize",()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.8));renderer.setSize(innerWidth,innerHeight)});
