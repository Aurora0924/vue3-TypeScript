<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus" @click="addTrademark" v-has="`btn.Trademark.add`">添加品牌</el-button>
    <el-table border style="margin: 10px 0px" :data="trademarkArr">
      <el-table-column label="序号" align="center" width="80px" type="index"></el-table-column>
      <el-table-column label="品牌名称" align="center">
        <template #="{ row, $index }">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌logo" align="center">
        <template #="{ row, $index }">
          <img :src="row.logoUrl" alt="" width="80px" height="80px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="Edit" @click="updateTrademark"></el-button>
          <el-popconfirm :title="`您确定要删除${row.tmName}?`" width="250px" icon="Delete" @confirm="">
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChange" @current-change="getTrademark" v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[1, 3, 5, 7, 9]" :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total" />
  </el-card>
  <el-dialog v-model="dialogVisible" title="添加品牌" width="500" :before-close="handleClose">
    <el-from style="width: 80%;">
      <el-form-item label="品牌名称" label-width="100px">
        <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px">
        <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-from>
    <template #footer>
      <el-button type="primary" @click="cencal">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark/trademark'
import type { responseTrademarkList, TrademarkResponseData, responseTrademark } from '@/api/product/trademark/type'
const pageNo = ref<number>(1)
const limit = ref<number>(6)
const total = ref<number>(0)
const dialogVisible = ref<boolean>(false)
const trademarkArr = ref<responseTrademarkList>([])
// 封装函数
const trademarkParams = reactive<responseTrademark>({
  tmName: '',
  logoUrl: ''
})
const getTrademark = async (pager = 1) => {
  pageNo.value = pager
  let request: TrademarkResponseData = await reqHasTrademark(pageNo.value, limit.value)

  if (request.code == 200) {
    total.value = request.data.total
    trademarkArr.value = request.data.records
  }
}
const updateTrademark = () => {
  dialogVisible.value = true
}
const addTrademark = () => {
  dialogVisible.value = true
}
const cencal = () => {
  dialogVisible.value = false
}
const confirm = () => {
  dialogVisible.value = false
}
onMounted(() => {
  getTrademark()
})
const sizeChange = () => {
  getTrademark()
}
</script>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
