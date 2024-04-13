<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select placeholder="请选择相应的分类" style="width: 240px" v-model="categoryStore.category1Id" @change="handler">
          <!-- value获取一级分类的id -->
          <el-option v-for="item in categoryStore.CategoryList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="二级分类">
        <el-select placeholder="请选择相应的分类" style="width: 240px" v-model="categoryStore.category2Id" @change="handlerCategory2">
          <el-option v-for="item in categoryStore.CategoryList2" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select placeholder="请选择相应的分类" style="width: 240px" v-model="categoryStore.category3Id">
          <el-option v-for="item in categoryStore.CategoryList3" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import {useCategoryStore} from '@/store/modules/category'
const categoryStore = useCategoryStore()
// 挂载完毕获取数据
onMounted(() => {
  getCategory1();
})
// 获取一级分类数据
const getCategory1 = () => {
  categoryStore.getCategory1List()
}
// 获取二级分类数据
const handler = () => {
  categoryStore.getCategory2List()
}
// 获取三级分类数据
const handlerCategory2 = () => {
  categoryStore.getCategory3List()
}
</script>

<style lang="scss" scoped>
</style>