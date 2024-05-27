//modal

document.addEventListener('DOMContentLoaded', function (event) {
  const open = document.querySelector('.open-modal-btn');

  const close = document.querySelector('.close');

  const layout = document.querySelector('.modal');

  open.addEventListener('click', function () {
    layout.style.display = 'flex';
  });

  close.addEventListener('click', function () {
    layout.style.display = 'none';
  });

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
});


//map
var mapContainer = document.getElementById('map-api'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(33.4423464, 126.5714548), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

// 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
var mapTypeControl = new kakao.maps.MapTypeControl();

// 지도에 컨트롤을 추가해야 지도위에 표시됩니다
// kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

// 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
var zoomControl = new kakao.maps.ZoomControl();
map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

var markerPosition  = new kakao.maps.LatLng(33.4423464, 126.5714548); 

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
    position: markerPosition
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);


//이미지 로드
const listPic = document.querySelector('.gallery-more-list');
      const btn = document.querySelector('.img-loading');
      let pageToPatch = 1;

      btn.addEventListener('click', () => {
        fetchImages((pageToPatch += 1));
      });

      async function fetchImages(page) {
        try {
          const response = await fetch(
            `https://picsum.photos/v2/list?page=${page}&limit=3`
          );

          if (!response.ok) {
            throw new Error('네트워크 응답에 문제가 있습니다.');
          }

          // 제이슨 데이터를 자바스크립트 객체로 파싱
          const datas = await response.json();
          console.log(datas);
          makeImageList(datas);
        } catch (error) {
          console.error(error);
        }
      }

      function makeImageList(datas) {
        datas.forEach((data) => {
          listPic.insertAdjacentHTML(
            'beforeend',
            `<li class="img-width"><img src="${data.download_url}" alt=""></li>`
          );
        });
      }