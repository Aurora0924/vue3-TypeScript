<template>
  <el-card class="box-card">
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      @click="addTrademark"
      v-has="`btn.Trademark.add`"
      >添加品牌</el-button
    >
    <el-table border style="margin: 10px 0px" :data="trademarkArr">
      <el-table-column
        label="序号"
        align="center"
        width="80px"
        type="index"
      ></el-table-column>
      <el-table-column label="品牌名称" align="center">
        <template #="{ row }">
          <pre>{{ row.tmName }}</pre>
        </template>
      </el-table-column>
      <el-table-column label="品牌logo" align="center">
        <template #="{ row }">
          <img :src="row.logoUrl" alt="" width="80px" height="80px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateTrademark(row)"
          ></el-button>
          <el-popconfirm
            :title="`您确定要删除${row.tmName}?`"
            width="250px"
            icon="Delete"
            @confirm=""
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="getTrademark"
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[1, 3, 5, 7, 9]"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
    />
  </el-card>
  <el-dialog
    v-model="dialogVisible"
    :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
    width="500"
  >
    <el-from
      style="width: 80%"
      :model="trademarkParams"
      :rules="rules"
      ref="formRef"
    >
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input
          placeholder=" 请您输入品牌名称"
          v-model="trademarkParams.tmName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="trademarkParams.logoUrl"
            :src="trademarkParams.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-from>
    <!-- 具名插槽 -->
    <template #footer>
      <el-button type="primary" @click="cencal">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { ElMessage, UploadProps } from "element-plus";
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
} from "@/api/product/trademark/index";
import type {
  responseTrademarkList,
  TrademarkResponseData,
  responseTrademark,
} from "@/api/product/trademark/type";
const pageNo = ref<number>(1);
const limit = ref<number>(6);
const total = ref<number>(0);
const dialogVisible = ref<boolean>(false);
const trademarkArr = ref<responseTrademarkList>([]);
const formRef = ref();
// 封装函数
const trademarkParams = reactive<responseTrademark>({
  tmName: "",
  logoUrl: "",
});
const getTrademark = async (pager = 1) => {
  pageNo.value = pager;
  let request: TrademarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  );

  if (request.code == 200) {
    total.value = request.data.total;
    trademarkArr.value = request.data.records;
  }
};
const updateTrademark = (row: responseTrademark) => {
  trademarkParams.id = row.id;
  // 合并
  Object.assign(trademarkParams, row);
  dialogVisible.value = true;
};
const addTrademark = () => {
  dialogVisible.value = true;
  trademarkParams.id = 0;
  trademarkParams.tmName = "";
  trademarkParams.logoUrl = "";
};
const cencal = () => {
  dialogVisible.value = false;
};
const confirm = async () => {
  // 返回promise对象
  await formRef.value.validate();
  let requset: any = await reqAddOrUpdateTrademark(trademarkParams);
  if (requset.code === 200) {
    dialogVisible.value = false;
    ElMessage({
      type: "success",
      message: trademarkParams.id ? "修改品牌成功" : "添加品牌成功",
    });
    getTrademark(trademarkParams.id ? pageNo.value : 1);
  } else {
    dialogVisible.value = false;
    ElMessage({
      type: "error",
      message: trademarkParams.id ? "修改品牌失败" : "添加品牌失败",
    });
  }
};
// 校验品牌名称
const validatorTmName = (_rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback();
  } else {
    callback(new Error("品牌名称长度必须大于2"));
  }
};
const validatorLogoUrl = (_rule: any, value: any, callback: any) => {
  if (value) {
    callback();
  } else {
    callback(new Error("请上传品牌logo"));
  }
};
// 校验
const rules = {
  tmName: [{ required: true, trigger: "blur", validator: validatorTmName }],
  logoUrl: [{ required: true, validator: validatorLogoUrl }],
};
//上传图片组件->上传图片之前触发的钩子函数
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  //钩子是在图片上传成功之前触发,上传文件之前可以约束文件类型与大小
  //要求:上传文件格式png|jpg|gif 4M
  if (
    rawFile.type == "image/png" ||
    rawFile.type == "image/jpeg" ||
    rawFile.type == "image/gif"
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true;
    } else {
      ElMessage({
        type: "error",
        message: "上传文件大小小于4M",
      });
      return false;
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传文件格式务必PNG|JPG|GIF",
    });
    return false;
  }
};
//图片上传成功钩子
const handleAvatarSuccess: UploadProps["onSuccess"] = (response) => {
  //response:即为当前这次上传图片post请求服务器返回的数据
  //收集上传图片的地址,添加一个新的品牌的时候带给服务器
  trademarkParams.logoUrl = response.data;
  //图片上传成功,清除掉对应图片校验结果
  formRef.value.clearValidate("logoUrl");
};
onMounted(() => {
  getTrademark();
});
const sizeChange = () => {
  getTrademark();
};
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
