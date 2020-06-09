export const header = [
  {
    title: 'Главное',
    link: '/'
  },
  {
    title: 'Войти',
    link: '/login'

  }
];
export const banner = [
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/cTyLQiaRrpzxFAuWwoDQ.svg',
    imgMobile: 'https://gw.alipayobjects.com/zos/rmsportal/ksMYqrCyhwQNdBKReFIU.svg',
    className: 'seeconf-wrap',
    children: [
      { children: 'Подготовка к Единому Национальному Тестированию ', className: 'seeconf-en-name' },
      { children: 'Новый метод обучения', className: 'seeconf-title', tag: 'h1' },
      { children: 'Попробуй сейчас', className: 'seeconf-cn-name' },
      {
        children: 'Зарегистрироваться',
        className: 'banner-button',
        tag: 'button',
        link: '/login',
      },
      { children: '10.05.2020', className: 'seeconf-time' },
    ],
  },
  {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/cTyLQiaRrpzxFAuWwoDQ.svg',
    imgMobile: 'https://gw.alipayobjects.com/zos/rmsportal/ksMYqrCyhwQNdBKReFIU.svg',
    className: 'seeconf-wrap',
    children: [
      { children: 'Подготовка к Единому Национальному Тестированию ', className: 'seeconf-en-name' },
      { children: 'Новый метод обучения', className: 'seeconf-title', tag: 'h1' },
      { children: 'Попробуй сейчас', className: 'seeconf-cn-name' },
      {
        children: 'Зарегистрироваться',
        className: 'banner-button',
        tag: 'button',
        link: '/login',
      },
      { children: '10.05.2020', className: 'seeconf-time' },
    ],
  }
];
export const page1 = {
  title: 'Наши Предметы',
  children: [
    {
      title: 'Физика',
      src: 'https://gw.alipayobjects.com/zos/rmsportal/KtRzkMmxBuWCVjPbBgRY.svg',
      color: '#EB2F96',
      shadowColor: 'rgba(166, 55, 112, 0.08)',
      link: 'https://ant.design/docs/spec/values-cn',
    },
    {
      title: 'История',
      src: 'https://gw.alipayobjects.com/zos/rmsportal/qIcZMXoztWjrnxzCNTHv.svg',
      color: '#1890FF',
      shadowColor: 'rgba(15, 93, 166, 0.08)',
      link: 'https://ant.design/docs/spec/colors-cn',
    },
    {
      title: 'математика',
      src: 'https://gw.alipayobjects.com/zos/rmsportal/eLtHtrKjXfabZfRchvVT.svg',
      color: '#AB33F7',
      shadowColor: 'rgba(112, 73, 166, 0.08)',
      link: 'https://antv.alipay.com/zh-cn/vis/index.html',
    },
  ],
};

export const page3 = {
  title: 'Видео Обзор',
  children: [
    {
      img: 'https://gw.alipayobjects.com/zos/rmsportal/iVOzVyhyQkQDhRsuyBXC.svg',
      imgMobile: 'https://gw.alipayobjects.com/zos/rmsportal/HxEfljPlykWElfhidpxR.svg',
      src: 'https://gw.alipayobjects.com/os/rmsportal/gCFHQneMNZMMYEdlHxqK.mp4',
    },
    {
      img: 'https://gw.alipayobjects.com/zos/rmsportal/iVOzVyhyQkQDhRsuyBXC.svg',
      imgMobile: 'https://gw.alipayobjects.com/zos/rmsportal/HxEfljPlykWElfhidpxR.svg',
      src: 'https://gw.alipayobjects.com/os/rmsportal/gCFHQneMNZMMYEdlHxqK.mp4',
    },
  ],
};

export const page4 = {
  title: 'Виды Уроков',
  children: [
    'https://gw.alipayobjects.com/zos/rmsportal/qImQXNUdQgqAKpPgzxyK.svg', // 阿里巴巴
    'https://gw.alipayobjects.com/zos/rmsportal/LqRoouplkwgeOVjFBIRp.svg', // 蚂蚁金服
    'https://gw.alipayobjects.com/zos/rmsportal/TLCyoAagnCGXUlbsMTWq.svg', // 人民网
    'https://gw.alipayobjects.com/zos/rmsportal/HmCGMKcJQMwfPLNCIhOH.svg', // cisco
    'https://gw.alipayobjects.com/zos/rmsportal/aqldfFDDqRVFRxqLUZOk.svg', // GrowingIO
    'https://gw.alipayobjects.com/zos/rmsportal/rqNeEFCGFuwiDKHaVaPp.svg', // 饿了么
    'https://gw.alipayobjects.com/zos/rmsportal/FdborlfwBxkWIqKbgRtq.svg', // 滴滴出行
    'https://gw.alipayobjects.com/zos/rmsportal/coPmiBkAGVTuTNFVRUcg.png', // 飞凡网
  ],
};

export const footer = [
  {
    title: 'Основатели',
    children: [
      { title: 'Калыбаев Ерсултан', link: 'https://open.alipay.com' },
      { title: 'Брумкул Жанат', link: 'https://xcloud.alipay.com' },
      { title: 'Кенес Адилжан', link: 'https://www.cloud.alipay.com' },
    ],
  },
  {
    title: 'Контакты',
    children: [
      { title: 'Телефон: +7 707 305 00 23' },
      { title: 'E-mail: kalybaev.iitu@gmail.com'},
    ],
  },
  {
    title: 'Страницы',
    children: [
      { title: 'Главная', link: 'https://zhuanlan.zhihu.com/xtech' },
      { title: 'Авторизация', link: 'https://weibo.com/p/1005056420205486' }
    ],
  },
  {
    title: 'Инструменты',
    children: [
      { title: 'Node js', desc: 'серверная часть', link: 'https://nodejs.org/en/' },
      { title: 'React js', desc: 'клиентская часть', link: 'https://ru.reactjs.org/' },
      { title: 'MongoDB', desc: 'база данных', link: 'https://www.mongodb.com/' }
    ],
  },
];

// 图处预加载；
if (typeof document !== 'undefined') {
  const div = document.createElement('div');
  div.style.display = 'none';
  document.body.appendChild(div);
  [
    'https://gw.alipayobjects.com/zos/rmsportal/KtRzkMmxBuWCVjPbBgRY.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/qIcZMXoztWjrnxzCNTHv.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/eLtHtrKjXfabZfRchvVT.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/iVOzVyhyQkQDhRsuyBXC.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/HxEfljPlykWElfhidpxR.svg',
    'https://gw.alipayobjects.com/zos/rmsportal/wdarlDDcdCaVoCprCRwB.svg',
  ].concat(page4.children).forEach((src) => {
    const img = new Image();
    img.src = src;
    div.appendChild(img);
  });
}
