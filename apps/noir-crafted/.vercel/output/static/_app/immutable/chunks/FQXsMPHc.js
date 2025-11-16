import{d as m}from"./8Ff3uIvk.js";class b{static render(o){const{template:l,variables:n}=o;m.startTimer("template-render"),m.template("info","Starting template rendering",{operation:"render",metadata:{templateLength:l.length,variableCount:Object.keys(n).length,variables:Object.keys(n)}});let t=l,p=0;const d=/\{\{(\w+(?:\.\w+)+)\}\}/g;let h;for(;(h=d.exec(l))!==null;){const r=h[1],e=r.split("."),c=e[0],g=e.slice(1);if(n[c]&&typeof n[c]=="object"){let s=n[c];for(const i of g)s=s==null?void 0:s[i];if(s!==void 0){const i=new RegExp(`\\{\\{${r.replace(/\./g,"\\.")}\\}\\}`,"g");t=t.replace(i,String(s)),p++}}}return Object.entries(n).forEach(([r,e])=>{if(new RegExp(`\\{\\{${r}\\.`).test(t)&&typeof e=="object"&&!Array.isArray(e))return;const g=new RegExp(`\\{\\{${r}\\}\\}`,"g"),s=t.match(g);if(s){p+=s.length;let i;Array.isArray(e)?r==="sections"?i=e.map(a=>`
              <div class="why-noir__section-item">
                <div class="why-noir__icon">${a.icon||""}</div>
                <h3 class="why-noir__section-title">${a.title||""}</h3>
                <p class="why-noir__section-description">${a.description||""}</p>
              </div>
            `).join(""):r==="items"?i=e.map(a=>`
              <div class="motifs__item">
                <h3 class="motifs__item-name">${a.name||""}</h3>
                <p class="motifs__item-description">${a.description||""}</p>
              </div>
            `).join(""):r==="stats"?i=e.map(a=>`
              <div class="whats-our-impact__stat">
                <div class="whats-our-impact__stat-value">${a.value||""}</div>
                <div class="whats-our-impact__stat-label">${a.label||""}</div>
              </div>
            `).join(""):i=e.map(a=>typeof a=="object"&&a!==null?`<div>${JSON.stringify(a)}</div>`:`<div>${String(a)}</div>`).join(""):typeof e=="object"&&e!==null?i=JSON.stringify(e):i=e!=null?String(e):"",t=t.replace(g,i),m.template("debug",`Replaced variable: ${r}`,{operation:"replace",metadata:{variable:r,value:i.substring(0,100),replacementCount:s.length}})}}),m.template("info","Template rendering completed",{operation:"render",metadata:{totalReplacements:p,finalLength:t.length,originalLength:l.length}}),m.endTimer("template-render",{replacementCount:p,originalLength:l.length,finalLength:t.length}),t}static extractVariables(o){const l=/\{\{(\w+)\}\}/g,n=[];let t;for(;(t=l.exec(o))!==null;)n.includes(t[1])||n.push(t[1]);return n}}class v{static render(o){const{template:l,variables:n,styles:t}=o;let d=b.render({template:l,variables:n}).replace(/onclick=/g,"on:click=").replace(/\{\{([^}]+)\}\}/g,"{$1}");return Object.keys(t).forEach(h=>{const r=new RegExp(`class="([^"]*\\b${h}\\b[^"]*)"`,"g");d=d.replace(r,(e,c)=>`class="${c.split(" ").map(s=>t[s]||s).join(" ")}"`)}),d}}export{v as S,b as T};
