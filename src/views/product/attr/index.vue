<template>
  <!-- 上级卡片 -->
  <Category></Category>
  <!-- 下级卡片 -->
  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="small" icon="Plus">添加分类</el-button>
    <el-table border style="margin: 10px 0px;" :data="categoryAttr">
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="attrName" label="属性名称" width="120px" align="center"></el-table-column>
      <el-table-column prop="prop" label="属性值名称" align="center">
        <template #="{ row }">
          <el-tag type="primary" v-for="item in row.attrValueList" :key="item.id" style="margin: 5px 5px;">{{ item.valueName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="200px" align="center">
        <template #=>
          <el-button type="primary" size="small" icon="Edit">修改</el-button>
          <el-button type="danger" size="small" icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { useCategoryStore } from '@/store/modules/category'
import { reqGetCategory } from '@/api/product/attr/index'
import type { AttrResponseData, Attr } from '@/api/product/attr/type'
const categoryStore = useCategoryStore()
const categoryAttr = ref<Attr[]>([])
watch(
  () => categoryStore.category3Id,
  () => {
    categoryAttr.value = []
    if(!categoryStore.category3Id) return;
    getCategory()
  }
)
const getCategory = async () => {
  const { category1Id, category2Id, category3Id } = categoryStore
  let result: AttrResponseData = await reqGetCategory(category1Id, category2Id, category3Id)
  console.log(result)

  if (result.code === 200) {
    categoryAttr.value = result.data
  }
}
</script>

<style lang="scss" scoped></style>
