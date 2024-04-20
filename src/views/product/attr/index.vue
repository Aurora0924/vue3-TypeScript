<template>
  <!-- 上级卡片 -->
  <Category :scne="scne"></Category>
  <!-- 下级卡片 -->
  <el-card style="margin: 10px 0px">
    <div v-show="scne == 0">
      <el-button type="primary" size="small" icon="Plus" @click="addAttr"
        >添加分类</el-button
      >
      <el-table border style="margin: 10px 0px" :data="categoryAttr">
        <el-table-column
          type="index"
          label="序号"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="attrName"
          label="属性名称"
          width="120px"
          align="center"
        ></el-table-column>
        <el-table-column prop="prop" label="属性值名称" align="center">
          <template #="{ row }">
            <el-tag
              type="primary"
              v-for="item in row.attrValueList"
              :key="item.id"
              style="margin: 5px 5px"
              >{{ item.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="prop" label="操作" width="200px" align="center">
          <template #="">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateAttr"
              >修改</el-button
            >
            <el-button type="danger" size="small" icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scne == 1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性名称"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" icon="Plus">添加属性</el-button>
      <el-button type="primary" size="small" @click="cancal">取消</el-button>
      <el-table border style="margin: 15px 0px">
        <el-table-column label="序号"></el-table-column>
        <el-table-column label="属性值"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <el-button type="primary" size="default">保存</el-button>
      <el-button type="primary" size="default" @click="cancal">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { useCategoryStore } from "@/store/modules/category";
import { reqGetCategory } from "@/api/product/attr/index";
import type { AttrResponseData, Attr } from "@/api/product/attr/type";
const categoryStore = useCategoryStore();
const categoryAttr = ref<Attr[]>([]);
const scne = ref<number>(0);
watch(
  () => categoryStore.category3Id,
  () => {
    categoryAttr.value = [];
    if (!categoryStore.category3Id) return;
    getCategory();
  },
);
const getCategory = async () => {
  const { category1Id, category2Id, category3Id } = categoryStore;
  let result: AttrResponseData = await reqGetCategory(
    category1Id,
    category2Id,
    category3Id,
  );
  console.log(result);

  if (result.code === 200) {
    categoryAttr.value = result.data;
  }
};
// 添加回调
const addAttr = () => {
  scne.value = 1;
};
// 修改回调
const updateAttr = () => {
  scne.value = 1;
};
// 取消回调
const cancal = () => {
  scne.value = 0;
};
</script>

<style lang="scss" scoped></style>
