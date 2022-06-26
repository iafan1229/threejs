export default function responsive() {
  

  window.addEventListener('resize', function () {
    
    if (window.matchMedia('(orientation: portrait)').matches) {
      if(this.innerWidth < 800) {
        document.querySelector(".responsive").style.display = "block"
      }
      // Portrait 모드일 때 실행할 스크립트
      // 폭과 높이가 같으면 Portrait 모드로 인식돼요
    } else {
      // Landscape 모드일 때 실행할 스크립트
      document.querySelector(".responsive").style.display = "none"
    }
  });
}