import{r as o,u as v,j as e,P as b}from"./index-CDXVN9HE.js";import{G as n,n as l,a as w}from"./iconBase-yEELHs3m.js";function j(a){return n({tag:"svg",attr:{viewBox:"0 0 640 512"},child:[{tag:"path",attr:{d:"M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"},child:[]}]})(a)}function y(a){return n({tag:"svg",attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"},child:[]}]})(a)}function N(a){return n({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"},child:[]}]})(a)}function x(a){return n({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"},child:[]}]})(a)}const C=()=>{const[a,p]=o.useState({username:"",password:""}),[i,m]=o.useState(!1),[u,c]=o.useState(!1),h=v(),f="https://app-backend-bottarelli-production.up.railway.app/api/auth-admin/login";o.useEffect(()=>{localStorage.removeItem("auth")},[]);const g=async r=>{r.preventDefault();try{if(a.username.length===0)l("Usuario vacio!");else if(a.password.length===0)l("Contraseña vacia!");else{c(!0);const s=await fetch(f,{method:"POST",headers:{"Content-Type":"application/json","access-control-allow-origin":"*"},body:JSON.stringify(a)}),t=await s.json();if(!s.ok)throw new Error(t==null?void 0:t.message);localStorage.setItem("auth",JSON.stringify(t)),w("Inicio de sesión correcto!"),h(`/${b.HOME}`,{replace:!0})}}catch(s){let t;s instanceof Error?t=s.message:t=s,t==="Failed to fetch"&&(t=" Error al conectar con el servidor"),l(t)}finally{c(!1)}},d=r=>{p(s=>({...s,[r.target.name]:r.target.value}))};return e.jsxs("div",{className:"w-[420px] text-[#820486] flex flex-col justify-center items-center border-[2px] border-[#00000033] py-[40px] px-[30px] rounded-lg shadow-sm shadow-[#00000033]",children:[e.jsx("h1",{className:"font-bold mb-[40px] text-4xl",children:"Iniciar Sesión"}),e.jsxs("form",{onSubmit:g,className:"w-full flex flex-col items-center",children:[e.jsxs("div",{className:"w-full",children:[e.jsxs("div",{className:"flex items-center w-full mb-4 gap-2",children:[e.jsx(x,{className:"text-[#820486]",size:24}),e.jsx("input",{type:"user",placeholder:"Usuario",name:"username",onChange:d,className:"w-full bg-transparent border-[2px] border-[#00000033] rounded-md text-black px-3 py-2 flex justify-start items-center"}),e.jsx("div",{children:e.jsx(x,{size:24,className:"text-transparent"})})]}),e.jsxs("div",{className:"flex items-center w-full gap-2",children:[e.jsx(N,{className:"text-[#820486]",size:24}),e.jsx("input",{type:i?"text":"password",placeholder:"Contraseña",name:"password",onChange:d,className:"w-full bg-transparent border-[2px] border-[#00000033] rounded-md text-black px-3 py-2 flex justify-start items-center"}),e.jsx("div",{className:"m-0",onClick:()=>m(!i),children:i?e.jsx(j,{size:24,className:"cursor-pointer"}):e.jsx(y,{size:24,className:"cursor-pointer"})})]})]}),e.jsx("button",{disabled:u,type:"submit",className:"mt-[40px] bg-white px-8 py-3 rounded-lg text-xl border-[1px] border-[#725ba7] text-[#725ba7] hover:bg-[#725ba7] hover:text-white transition-all duration-300 font-bold",children:"Iniciar Sesión"})]})]})};export{C as default};