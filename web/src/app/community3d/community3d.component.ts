import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {BoxGeometry, Mesh, MeshBasicMaterial, PerspectiveCamera, Scene, WebGLRenderer} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

/**
 * 社区3D
 * 示例网上的代码：
 * https://codepen.io/shshaw/pen/yPPOEg
 */
@Component({
  selector: 'app-community3d',
  templateUrl: './community3d.component.html',
  styleUrls: ['./community3d.component.scss']
})
export class Community3dComponent implements AfterViewInit {
  /**
   * 对应 V 层中的 HTML 元素
   */
  @ViewChild('scene', {static: true})
  htmlElementRef: ElementRef<HTMLElement>;
  /**
   *   宽度
   */
  private width: number;
  /**
   *   长度
   */
  private height: number;
  /**
   * 渲染器
   */
  private render: WebGLRenderer;
  /**
   * 场景
   */
  private scene: Scene;
  /**
   * 摄像机
   */
  private camera: PerspectiveCamera;

  constructor() {
  }

  ngAfterViewInit(): void {
    const htmlElement = this.htmlElementRef.nativeElement as HTMLElement;
    this.width = htmlElement.clientWidth;
    this.height = htmlElement.clientHeight;
    // 最后创建一个渲染器。渲染即将一种数据格式变换为另一种数据格式，比如我们当前要把一些3D 的参数变换为3D 的图像
    this.render = new THREE.WebGLRenderer();
    // 设置舞台大小与当前组件的设置的 DOM 大小一样大。
    this.render.setSize(this.width, this.height);

    // 将渲染器渲染的dom元素追加到当前组件中，如此以来我们便看到当前的 DOM 被填充为黑的背景，为下一步电影上演做好的准备
    htmlElement.appendChild(this.render.domElement);

    // 接下来，我们创建一个立方体
    this.createGeometry();
  }

  private createGeometry() {
    // 创建一个立方体
    const geometry = new THREE.BoxGeometry();
    // 准备一种涂料，然后把它涂到立方体表面上
    const material = new THREE.MeshBasicMaterial({color: 0xffff00});
    // 将立方体与颜色绑定在一起，称为网格，此时我们拥有一个携带有绿色立方体的网格，该网格可以在3D 的舞台上自由移动、变换。
    const cube = new THREE.Mesh(geometry, material);
    cube.position.y = 1;
    cube.position.x = 1;
    cube.position.z = 1;

    // 而要想看到网格，还需要一个可以容纳多个网格的舞台。
    this.scene = new THREE.Scene();
    // 舞台有了，还需要确认当前观众的位置，即我们站在哪去观察这个舞台。同一个舞台，站在不同的角度观察，看到的是不一样的
    // 在three.js 中，把这个观察的位置称为摄像机，即当前并不是由观众来观察，而在这个位置放了一个摄像机。
    // three.js中的摄像机有很多中，我们在此使用一个叫做 透视摄像机，顾名思议，该摄像机可以看到物体的内部
    // 和现实生活中的摄像机一样，摄像机有几个参数：
    // 1. 可视角度。比如我们照全景时，则需要一个广角摄像机（取决于镜头）。另一些需要照的远的，则往往可视角会比较小。
    // 2. 摄像机感应器的长宽比，这决定最后我们录出来的是16：9的画面，还是4：3的画面。
    // 3. 摄像机距离3D舞台的距离(摄像机也可能位于舞台之上)。这个需要用两个参数来设置：近截面、远截面。摄像机将远截面位置的内容，投景到近截面上。
    // 最终我们看到的是远截面内容在近截面的投影。这个去 GOOGLE 一下，看看相关的图片即可。算法可以忽略.
    this.camera = new THREE.PerspectiveCamera(100, this.width / this.height, 0.1, 1000);
    // 最近设置一下相机的位置
    this.camera.position.z = 15;
    this.camera.position.y = 30;
    this.camera.position.x = 10;
    this.camera.rotation.set(-0.5, 0, 0);
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);
    this.scene.add(cube);

    // 添加一个光源，不然黑色的物体看不到
    const light = new THREE.PointLight( 0xffffcc, 20, 200 );
    light.position.set( 100, 100, 20 );
    this.scene.add( light );

    this.loadGLTFModel();

    // 接下来，我们需要让这个动画动起来，比如显示器每刷新一次，立方体就旋转一点
    this.rotatePerFrame(cube);
  }

  /**
   * 每针旋转一次立方体
   * @param cube 带有立方体的网格
   */
  rotatePerFrame(cube: Mesh<BoxGeometry, MeshBasicMaterial>) {
    // 分别绕 X Y 轴旋转0.01的角度，则60HZ 的屏幕下，每秒旋转0.6
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    this.render.render(this.scene, this.camera);
    // 在下一帧来到时，执行此回调
    requestAnimationFrame(() => this.rotatePerFrame(cube));
  }

  /**
   * 加载GLTF格式的模型
   */
  private loadGLTFModel() {
    const loader = new GLTFLoader();
    loader.load('/assets/community3d/123.gltf', gltf => {
      this.scene.add(gltf.scene);
    }, undefined, error => console.log('error', error));
  }
}
