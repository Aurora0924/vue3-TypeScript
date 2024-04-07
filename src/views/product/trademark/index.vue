<template>
  <el-card class="box-card">
    <el-button type="primary" icon="Plus">品牌管理</el-button>
    <el-table border style="margin: 10px 0px" :data="trademarkArr">
      <el-table-column label="序号" align="center" width="80px" type="index" </el-table-column>
        <el-table-column label="品牌名称" align="center">
          <template #="{row,$index}">
            <pre>{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌logo" align="center">
          <template #="{row,$index}">
            <img :src="row.logoUrl" alt="" width="80px" height="80px">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="Edit"></el-button>
            <el-popconfirm :title="`您确定要删除${row.tmName}?`" width="250px" icon="Delete"
                @confirm=''>
              <template #reference>
                  <el-button type="primary" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[1,3,5,7,9]" :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark/trademark'
const pageNo = ref<number>(1)
const limit = ref<number>(5)
const total = ref<number>(0)
const trademarkArr = ref<any>([])
// 封装函数
const getTrademark = async () => {
  let request = await reqHasTrademark(pageNo.value, limit.value)
  console.log(request)

  if (request.code == 200) {
    total.value = request.data.total
    trademarkArr.value = request.data.records
  }
}
onMounted(() => {
  getTrademark()
})
</script>

<style lang="scss" scoped></style>
