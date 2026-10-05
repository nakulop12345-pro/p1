export function createNavigation({onRoute}){
  const buttons=[...document.querySelectorAll("[data-route]")];
  buttons.forEach(btn=>{
    btn.addEventListener("click",()=>{
      buttons.forEach(b=>b.classList.toggle("active",b===btn));
      onRoute(btn.dataset.route);
    });
  });
}
