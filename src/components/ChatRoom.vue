<template>
    <div id="chat-room">
      <!-- 结果页 -->
      <div class="result position" v-if="scen.result">
        <div class="res position">
          <div class="frame">
            <div class="people">
              <img :src="img.people2" alt="" />
              <img :src="img.imgUrl" alt="" />
            </div>
            <div class="index"><i>99</i></div>
            <div class="QR">
              <img :src="img.QR" alt="" />
              <p>扫描二维码合影</p>
            </div>
          </div>
        </div>
        <div class="save position">
          <img src="" alt=""/>
        </div>
        <section class="res-btn">

          <p></p>

          <div class="btn">

            <router-link to="" @click.native="Comeback">重新上传</router-link>

            <router-link to="">下载</router-link>

          </div>

        </section>
        <section id="canvas" class="position"></section>
      </div>
      <!-- 上传图片 -->
      <div class="Filename position" v-if="scen.Filename">
        <div class="model">
          <div class="model1"></div>
          <div class="model2"></div>
          <div class="model3"></div>
        </div>
        <div class="people">
          <img :src="img.people" alt="" />
        </div>
        <div class="people1">
          <img :src="img.people1" alt="" />
        </div>
        <div class="upload">
          <div class="title"></div>
            <button>
              上传图片
              <input type="file" value="" name="" ref="file" @touchend="touchend"/>
            </button>
        </div>
        <div class="file_load position" v-if="submit.loading">
          <div></div>
        </div>
      </div>
      <!-- 提交预约信息 -->
      <div class="about position" v-if="scen.about">
        <div class="about-info">
          <div class="info-name">
            <p>您的姓名 <span v-show="layer.name">请输入您的姓名</span></p>
            <input type="text" value="" name="" />
          </div>
          <div class="info-sex">
            <p>性别 <span v-show="layer.sex">请输入您的性别</span></p>
            <input type="text" value="" name="" />
          </div>
          <div class="info-tel">
            <p>手机号码 <span v-show="layer.tel">{{layer.telText}}</span></p>
            <input type="tel" value="" name="" />
          </div>
          <button @touchstart="Submit">提交预约</button>
        </div>
        <div class="position" v-if="submit.onOff">
          <p>正在提交中.....</p>
        </div>
      </div>
      <!-- 模拟聊天 -->
      <div class="ChatRoom position" v-if="scen.ChatRoom">
        <swiper :options="swiperOption">
          <swiper-slide class="room" v-html="roomHTML"></swiper-slide>
        </swiper>
        <hr />
        <section class="text-input">
          <input type="text" value="" name="" @focus="foucs" @blur="blur" /><span @touchstart="touchstart">发送</span>
        </section>
      </div>
    </div>
</template>

<script>

  let [timer,parStr] = [null,""];
  let textArr = ["很高兴认识你！","有没有看我主演的《天乩之白蛇传说》~","这部剧真的很不错哦。我最近即将新官儿上任，成为《天乩之白蛇传说》同名手游里的首席设计官","首席服务官，并且亲手设计了一套游戏时装想邀请你试穿一下，不知道你方不方便呐？","并且亲手准备了一项神秘服务想请你体验，不知道你方不方便呐？","哈哈，果然是自乩人，不如留个电话给我，我教你如果到游戏中体验我设计的时装吧。","我教你如何体验这项神秘服务吧","收到~聊得如此愉快，必须得合影留念啊"];

  import people from "@/common/images/people2.png"
  import people1 from "@/common/images/bb1.png"
  import people2 from "@/common/images/bb1.png"
  import QR from "@/common/images/QR.png"

  import html2canvas from "html2canvas"
    export default {
        name:"chat-room",
        data() {
            return {
              roomHTML:'',
              user_img:null,
              //提交预约信息提醒
              layer:{
                name:false,
                sex:false,
                tel:false,
                telText:null
              },
              submit:{
                onOff:false,
                loading:false
              },
              //上传图片合成模板
              img:{
                people,
                people1,
                people2,
                QR,
                imgUrl:null
              },
              //场景切换
              scen:{
                ChatRoom:true,
                about:false,
                Filename:false,
                result:false
              },
              html2canvas,
              //swiper滑屏相关配置
              swiperOption:{
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: true,
                mousewheel: true,
                autoHeight : true
              }
            }
        },
        created() {
        },
        computed:{
          store(){
            return this.$store.state;
          }
        },
        mounted() {
          timer = setInterval(() => {
            this.getData('你好，在嘛');
          },3000);

          this.$http.get("http://h5.xmluma.cn/app/index.php?i=23&c=utility&a=userinfo&isajax=true",{
            withCredentials:true
          }).then((response)=>{
            this.user_img = response.data.avatar;
          }).catch((error) => {
            console.log(error);
          });

        },
        methods:{
          getData(text) {

            parStr += `<div class="left">

              <img src="${this.store.getCookie('headImg')}" alt="" />

              <div>

                <p>${text} <span></span></p>

              </div>

            </div>`;

            this.roomHTML = parStr;

          },
          //模拟聊天生成dome节点
          touchstart() {
            let val = $(".text-input input").val();
            let numtext = Math.floor(Math.random()*textArr.length);
            if (val === "")return false;

            parStr += `<div class="right">

            <img src="${this.user_img}" alt="" />

            <div>

              <p>${val} <span></span></p>

            </div>

          </div>`;
            this.roomHTML = parStr;

            $(".text-input input").val('');

            setTimeout(() => {
              this.getData(textArr[numtext]);
              this.roomHTML = parStr;
            },800);

            if (val === "123"){
              setTimeout(() => {
                this.scen.ChatRoom = false;
                this.scen.about = true;
                clearInterval(timer);
              },2000);
            }
          },
          //上传图片装成base64格式
          touchend() {
            let File = this.$refs.file;
            let reader = new FileReader();
            let Http = this.$http;
            let _this = this;
            $(File).on("change",function (){
              reader.readAsDataURL(File.files[0]);
              reader.onload = function (){
                _this.submit.loading = true;
                Http.post("http://h5.xmluma.cn/app/index.php?i=23&c=entry&do=baseupload&m=tianji_xmluma&isajax=true",{
                  reg_img:reader.result,
                  withCredentials:true
                }).then((response) => {
                  //console.log(reader.result);
                  $(File).val("");
                  if(response.data.code == 1){

                    Http.post("http://h5.xmluma.cn/app/index.php?i=23&c=entry&do=api&m=tianji_xmluma&isajax=true",{
                      img:response.data.data,
                      sex:1,
                      model_id:'youtu_76521_20180709095053_1866',
                      withCredentials:true
                    }).then((response) => {
                      console.log(response);
                    _this.scen.Filename = false;
                    _this.scen.result = true;
                    _this.submit.loading = false;
                    _this.img.imgUrl = response.data.base;
                    _this.submit.loading = false;

                    setTimeout(() => {
                      html2canvas(document.querySelector(".res")).then(function(canvas) {
                      document.querySelector("#canvas").appendChild(canvas);

                      $(".save img").get(0).src = canvas.toDataURL();
                      });
                    },1000);

                    }).catch((error) => {
                      console.log(error);
                    });
                 }
                }).catch((error) => {
                  console.log(error);
                });

              }
            });
          },
          //预约表单提交
          Submit() {
            let [name,sex,tel] = [$(".info-name input").val(),$(".info-sex input").val(),$(".info-tel input").val()];
            let regu = "^[ ]+$";//空格的正则
            let re = new RegExp(regu);
            let myreg = "^[1][3,4,5,7,8,9][0-9]{9}$";//电话号码正则
            let Telre = new RegExp(myreg);

            if (name === "" ||re.test(name)){
              this.layer.name = true;
              setTimeout(() => {
                this.layer.name = false;
            },2000);
              return false;
            }

            if (sex === "" || re.test(sex)){
              this.layer.sex = true;
              setTimeout(() => {
                this.layer.sex = false;
            },2000);
              return false;
            }

            if (tel === "" || re.test(tel)){
              this.layer.tel = true;
              this.layer.telText = "请输入您的手机号码";
              setTimeout(() => {
                this.layer.tel = false;
                this.layer.telText = "";
            },2000);

              return false;
            }

            if (tel.length != 11){
              this.layer.tel = true;
              this.layer.telText = "您输入的手机号位数不正确";

              setTimeout(() => {
                this.layer.tel = false;
              this.layer.telText = "";
            },2000);
            }

            if (!Telre.test(tel)){
              this.layer.tel = true;
              this.layer.telText = "请输入正确的手机号";

              setTimeout(() => {
                this.layer.tel = false;
              this.layer.telText = "";
            },2000);
              return false;
            }

            this.submit.onOff = true;

            this.$http.post("http://h5.xmluma.cn/app/index.php?i=23&c=entry&do=api&m=tianji_xmluma&act=order&isajax=true",{
              username:name,//用户名
              mobile:tel,//电话
              sex:sex,//性别
              withCredentials:true
            }).then((response)=>{
              console.log(response);
            this.submit.onOff = false;
            this.scen.about = false;
            this.scen.Filename = true;
            this.model();
          }).catch((error) => {
              console.log(error);
          });

            console.log(name,sex,tel);
          },
          model(){
              $(".model1").scc=({"margin-top":"0.1rem",
                "border": "0.2rem solid #ffffff"})
              let code = this.$store.state.getCookie('code');
              var sex = 2;
              //明星为杨紫
              if(!code){
                if(sex == 1){

                }
              }
              else{
                if(sex == 1){

                }
              }

            },
          //获取焦点清除定时器
          foucs() {
            clearInterval(timer);
          },
          //失去焦点开启开启自动聊天
          blur() {
            timer = setInterval(() => {
              let numtext = Math.floor(Math.random()*textArr.length);
              this.getData(textArr[numtext]);
            },6000);
          },
          //从新上传照片
          Comeback() {
            this.scen.result = false;
            this.scen.Filename = true;
          }
        }
    }

</script>
