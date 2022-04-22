<template>
  <div class="home">
    <div class="home_top">
      <div v-for="(item, index) in 4" :key="index" class="home_top_item_num">
        <div class="home_top_item_num_title">总收入</div>
        <div class="home_top_item_num_middle">￥28,425.00</div>
        <div class="home_top_item_num_foot">自从上周以来</div>
      </div>
    </div>
    <div class="home_topmidlle">
      <div class="home_topmidlle_line">
        <div class="title">
          <p>统计数据</p>
        </div>
        <echarts-component class="home_topmidlle_line_content" :option="optionLine" />
      </div>
      <div class="home_topmidlle_pie">
        <div class="title">处置调度</div>
        <echarts-component class="home_topmidlle_pie_content" :option="optionPie" />
      </div>
    </div>
    <div class="home_midlle">
      <div class="home_midlle_left">
        <div class="title">指挥中心</div>
        <div class="home_midlle_left_content">
          <table-component :columns="columns" url="/mock/getList">
            <template #name="{ scope }">
              <el-tag>{{ scope.name }}</el-tag>
            </template>
            <template #action>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </table-component>
        </div>
      </div>
      <div class="home_midlle_right">
        <div class="title">指挥中心</div>
        <div class="home_midlle_right_content">
          <table-component :columns="[]" url="/mock/getLis">
            <template #name="{ scope }">
              <el-button type="text">{{ scope.name }}</el-button>
            </template>
          </table-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { optionLine, optionPie, columns } from './options'
import echartsComponent from '@/components/echarts-component.vue'
import tableComponent from '@/components/table-component.vue'
</script>

<style lang="scss" scoped>
.home {
  &_top {
    display: flex;
    justify-content: space-between;

    &_item_num {
      @include whiteContent;
      flex: 0 0 384px;
      justify-content: inherit;
      box-sizing: border-box;
      padding: 34px;
      height: 168px;
      color: #999999;
      font-size: 12px;

      &_middle {
        font-size: 28px;
        color: #191919;
      }
    }
  }

  &_topmidlle {
    display: flex;
    width: 100%;
    height: 405px;
    margin-top: 18px;

    &_line {
      box-sizing: border-box;
      @include whiteContent;
      margin-right: 40px;

      &_content {
        flex: 1;
      }
    }

    &_pie {
      @include whiteContent;
      flex: 0 0 384px;

      &_content {
        flex: 1;
      }
    }
  }

  &_midlle {
    display: flex;
    margin-top: 20px;
    width: 100%;
    height: 465px;

    &_left {
      @include whiteContent;
      margin-right: 20px;
      padding-bottom: 20px;
      overflow: hidden;

      &_content {
        flex: 1;
        padding: 20px 40px 0px 40px;
        overflow: hidden;
      }
    }

    &_right {
      @include whiteContent;
      padding-bottom: 20px;
      overflow: hidden;

      &_content {
        flex: 1;
        padding: 20px 40px 0px 40px;
        overflow: hidden;
      }
    }
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    padding: 30px 40px 0px 40px;
  }
}
</style>
