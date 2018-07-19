<template>
    <div  id="home">
      <view-box>
        <panel :list="dataList"></panel>

        <section class="SayHello">
          <ul>
            <li>{{$store.state.getCookie('name')}}:你好，我是{{$store.state.getCookie('name')}}<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;想加你为好友，请通过吧！</li>
            <div to="/Home" class="reply">回复</div>
          </ul>
        </section>

        <router-link to="" class="SetUp">设置备注和标签</router-link>

        <section class="region">
          <div>地区 <span>阿根廷</span></div>
          <div>来源 <span>对方通过搜索微信号添加</span></div>
        </section>

        <router-link to="/ChatRoom" class="agree">通过验证</router-link>
      </view-box>
    </div>
</template>

<script>
    import {ViewBox,Panel} from "vux";

    export default {
      components: {ViewBox,Panel},
      name: "home",
      data() {
        return {
          dataList:[{
            src:this.$store.state.getCookie('headImg'),
            title:this.$store.state.getCookie('name')+"<i></i>",
            desc:"微信号"
          }]
        }
      },
      created() {},
      computed:{
        store() {
          return this.$store.state;
        }
      },
      mounted() {},
      methods:{}
    }
</script>

<style lang="less">

  @import '~vux/src/styles/reset.less';

</style>
