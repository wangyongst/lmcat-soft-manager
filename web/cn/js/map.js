// //创建和初始化地图函数：
  function initMap() {
    createMap(); //创建地图
    setMapEvent(); //设置地图事件
    addMapControl(); //向地图添加控件
    // addMarker(); //向地图中添加marker
  }
  var map;
  var point;


  //创建地图函数：
  function createMap() {    
    map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图
    point = new BMap.Point(116.355517, 39.981647); //定义一个中心点坐标
    map.centerAndZoom(point, 16); //设定地图的中心点和坐标并将地图显示在地图容器中
  }

  //地图事件设置函数：
  function setMapEvent() {
    map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
    map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
    map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
    map.enableKeyboard(); //启用键盘上下左右键移动地图
  }

  //地图控件添加函数：
  function addMapControl() {
    //向地图中添加缩放控件
    var ctrl_nav = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      type: BMAP_NAVIGATION_CONTROL_ZOOM
    });
    map.addControl(ctrl_nav);
    //向地图中添加缩略图控件
    var ctrl_ove = new BMap.OverviewMapControl({
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
      isOpen: 0
    });
    map.addControl(ctrl_ove);
    //向地图中添加比例尺控件
    var ctrl_sca = new BMap.ScaleControl({
      anchor: BMAP_ANCHOR_BOTTOM_RIGHT
    });
    map.addControl(ctrl_sca);
  }

  initMap(); //创建和初始化地图

  // 添加信息标注
  var marker = new BMap.Marker(point);  // 创建标注
  map.addOverlay(marker);              // 将标注添加到地图中
  map.centerAndZoom(point, 16);

  var opts = {
    width : 200,     // 信息窗口宽度
    height: 80,     // 信息窗口高度
    title : "龙猫数据" , // 信息窗口标题
    enableMessage:true,//设置允许信息窗发送短息
    message:""
  }
  
  var infoWindow = new BMap.InfoWindow("地址：北京市海淀区知春路锦秋国际大厦A座2004-2006", opts);  // 创建信息窗口对象
  map.openInfoWindow(infoWindow, point); //开启信息窗口 
  marker.addEventListener("click", function(){          
    map.openInfoWindow(infoWindow,point); //开启信息窗口
  });