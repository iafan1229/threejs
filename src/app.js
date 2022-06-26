import Page from "./Page";

class Menu {
  $button1 = document.querySelector('button'); // 메뉴 버튼1
  // $button2 = document.querySelector('.button2'); // 메뉴 버튼2
  menu; // 현재 메뉴가 어떤 메뉴인지

  constructor() {
    this.menuClick();
  }

  menuClick() { // 메뉴 클릭 메서드
    this.$button1.addEventListener('click', () => {

      if (this.menu === '/about-me') return; // 이미 해당 메뉴 상태라면 반환

      this.menu = '/about-me' // 현재 메뉴 할당

      window.history.pushState({ path: '/about-me' }, '', '/about-me'); // history.pushState 로 url 주소변경

      const page = new Page(); // 페이지 인스턴스 생성
      page.render(); // 페이지 렌더링
    })

    // this.$button2.addEventListener('click', () => {

    //   if (this.menu === '/contact') return; // 이미 해당 메뉴 상태라면 반환

    //   this.menu = '/contact' // 현재 메뉴 할당

    //   window.history.pushState({ path: '/contact' }, '', '/contact'); // history.pushState 로 url 주소변경

    //   const page = new Page(); // 페이지 인스턴스 생성
    //   page.render(); // 페이지 렌더링
    // })
  }
}

window.onpopstate = function (event) { // 사용자가 브라우저 이동 시 발생되는 이벤트
  const page = new Page();
  page.render(); // 브라우저 이동할 때마다 렌더링
};

export default function app () {
  new Menu();
}