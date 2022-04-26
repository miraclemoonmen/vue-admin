<script lang="ts" setup>
import { optionLine, optionPie, columns1, columns2, paginationAndSortOptions1, paginationAndSortOptions2 } from './options'
import echartsComponent from '@/components/echarts-component.vue'
import tableComponent from '@/components/table-component.vue'
import { useInitTable } from '@/hooks/useTable'

const { tableData: tableData1, tableLoading: tableLoading1, sortChange: sortChange1, getTableData: getTableData1 } = useInitTable('/mock/getList', paginationAndSortOptions1)
const { tableData: tableData2, tableLoading: tableLoading2, sortChange: sortChange2, getTableData: getTableData2 } = useInitTable('/mock/getList', paginationAndSortOptions2)
getTableData1()
getTableData2()
</script>

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
          <table-component :columns="columns1" :data="tableData1" v-loading="tableLoading1" @sort-change="sortChange1">
            <template #name="{ scope }">
              <el-tag>{{ scope.name }}</el-tag>
            </template>
            <template #action>
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </table-component>
        </div>
        <el-pagination class="el-table-pagination" v-model:currentPage="paginationAndSortOptions1.currentPage"
          v-model:page-size="paginationAndSortOptions1.pageSize" :total="tableData1?.total || 0"
          :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" @size-change="getTableData1"
          @current-change="getTableData1" />
      </div>
      <div class="home_midlle_right">
        <div class="title">指挥中心</div>
        <div class="home_midlle_right_content">
          <table-component :columns="columns2" :data="tableData2" v-loading="tableLoading2" @sort-change="sortChange2">
            <template #name="{ scope }">
              <el-button type="text">{{ scope.name }}</el-button>
            </template>
          </table-component>
        </div>
        <el-pagination class="el-table-pagination" v-model:currentPage="paginationAndSortOptions2.currentPage"
          v-model:page-size="paginationAndSortOptions2.pageSize" :total="tableData2?.total || 0"
          :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" @size-change="getTableData2"
          @current-change="getTableData2" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  &_top {
    display: flex;
    justify-content: space-between;

    &_item_num {
      display: flex;
      flex-direction: column;
      flex: 1;
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
      display: flex;
      flex-direction: column;
      flex: 1;
      @include whiteContent;
      margin-right: 40px;

      &_content {
        flex: 1;
      }
    }

    &_pie {
      display: flex;
      flex-direction: column;
      flex: 1;
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
    justify-content: space-between;

    &_left,
    &_right {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex: 1;
      @include whiteContent;
      padding-bottom: 20px;
      overflow: hidden;
      padding: 0px 10px 10px 10px;
      flex: 0 0 49%;

      &_content {
        flex: 1;
        overflow: hidden;
      }
    }
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 22px;
    padding: 20px 40px 0px 40px;
  }
}
</style>
