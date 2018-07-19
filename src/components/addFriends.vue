<template>
  <div id="addFriends">
    <!--时间-->
    <section class="time">
      <div class="time-min">
        <div class="time_data">{{Time.iHours<=9?"0"+Time.iHours:Time.iHours}} : {{Time.iMin<=9?"0"+Time.iMin:Time.iMin}}</div>
        <div class="Lunarday">{{Time.iMonth}}月{{Time.iData}}日</div>
      </div>
    </section>
    <!-- 申请好友列表 -->
    <section class="friends" style="vertical-align: middle;">
      <div style="width: 12.6rem; border:1px solid #999999;margin: 0 auto"></div>
      <div class="apply"  @touchstart="touchstart(0)">
        <router-link to="/home">
          <div class="wechat" style="margin-top: 0;">
            <img :src="addInfoData[0].weChat" alt="">
            <span>微信</span>
          </div>
          <div class="add_info">
            <img :src="addInfoData[0].img" alt="" />
            <div>
              <p><span style="width:1.7rem;display: inline-block;text-align:justify;">{{addInfoData[0].name}}</span>：您好，我是{{addInfoData[0].name}}</p>
              <p style="margin-left: 0.75rem">想加您为好友，请通过吧！</p>
            </div>
          </div>
        </router-link>
      </div>
      <div class="apply" @touchstart="touchstart(1)">
      <router-link to="/home">
        <div class="wechat" style="margin-top: 0;">
          <img :src="addInfoData[1].weChat" alt="">
          <span>微信</span>
        </div>
        <div class="add_info">
          <img :src="addInfoData[1].img" alt="" />
          <div>
            <p><span style="width:1.7rem;display: inline-block;text-align:justify;">{{addInfoData[1].name}}</span>：您好，我是{{addInfoData[1].name}}</p>
            <p style="margin-left: 0.75rem">想加您为好友，请通过吧！</p>
          </div>
        </div>
      </router-link>
    </div>

    </section>
  </div>
</template>

<script>
    import head1 from "@/common/images/head1.png";
    import head2 from "@/common/images/head2.png";
    import weChat from "@/common/images/weChat.png"

    export default {
        name: "addFriends",
        data() {
            return {
              Time:{
                iMonth:null,//月
                iData:null,//日
                iHours:null,//时
                iMin:null//分
              },
              addInfoData:[{
                weChat:weChat,
                img:head2,
                name:"杨紫"
              },{
                weChat:weChat,
                img:head1,
                name:"任嘉伦"
              }]
            }
        },
        created() {
          this.getData();
        },
        computed:{
            store() {
              return this.$store.state;
            }
        },
        mounted() {
          setInterval(() => {
            this.getData();
          },1000);
        },
        methods:{
            //时间
            getData() {
              let myTime = new Date();//系统的当前时间
              this.Time.iMonth = myTime.getMonth()+1;//月
              this.Time.iData = myTime.getDate();//日
              this.Time.iHours = myTime.getHours();//时
              this.Time.iMin = myTime.getMinutes();//分
            },
            touchstart(index) {
              this.store.setCookit("headImg",$(".apply").eq(index).find(".add_info img").attr('src'),2);
              this.store.setCookit("name",$(".apply").eq(index).find(".add_info div").find("p i").text(),2);
              this.store.setCookit("code",index);
            }
        }
    }
</script>

<style scoped>

</style>
