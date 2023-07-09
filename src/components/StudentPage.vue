<template>
    <!--分页+工具-->
    <div id="student-container">
        <div>
            <el-pagination background layout="prev, pager, next" :total="1000" @current-change="queryInfo"/>
<!--            两个按钮-->
            <div  class="toolbar">
                <el-button link type="primary" size="small" @click="registryInfo">注册学生信息</el-button>
                <el-button link type="primary" size="small" @click="exportInfo">导出学生信息</el-button>
            </div>
        </div>
        <!--列表-->
        <el-table :data="pageVar.tableDatas" style="width: 100%">
            <el-table-column prop="date" label="日期" width="150" />
            <el-table-column prop="name" label="姓名" width="120" />
            <el-table-column prop="state" label="状态" width="120" />
            <el-table-column prop="city" label="城市" width="120" />
            <el-table-column prop="address" label="地址" width="200" />
            <el-table-column fixed="right" label="操作" width="120">
<!--                scope用于获取索引-->
                <template #default = "scope">
                    <el-button link type="primary" size="small" @click="deleteRow(scope.$index)">删除</el-button>
                    <el-button link type="primary" size="small" @click="updateRow(scope.$index)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--弹出对话框：表单   dialogVisible对话框是否显示-->
        <el-dialog v-model="pageVar.dialogVisible" title="学生信息"  width="30%">
            <el-form ref="ruleFormRef" :model="pageVar.studentInfo" :rules="pageVar.validateRules"
                     label-width="120px" status-icon >
                <el-form-item label="ID" prop="id">
                    <el-input v-model="pageVar.studentInfo.id" />
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-input v-model="pageVar.studentInfo.date" type="date"/>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="pageVar.studentInfo.name" />
                </el-form-item>
                <el-form-item label="状态" prop="state">
                    <el-input v-model="pageVar.studentInfo.state" />
                </el-form-item>
                <el-form-item label="城市" prop="city">
                    <el-input v-model="pageVar.studentInfo.city" />
                </el-form-item>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="pageVar.studentInfo.address" />
                </el-form-item>
            </el-form>
            <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import {reactive, ref, getCurrentInstance, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
// 用于导出到表格中
import * as XLSX from 'xlsx'

const { proxy } = getCurrentInstance()

let curOperatorIndex = {}

let ruleFormRef = ref(null)
let pageVar = reactive({
    // 对话框是否显示
    dialogVisible: false,
    //为了复用对话框， 更新和删除作出区分
    isUpdate: false,
    //控制表单内容， 表单中的数据模型， 表单中的数据根据这里的内容来修改
    studentInfo: {
        id: "",
        date: '',
        name: '',
        state: '',
        city: '',
        address: ''
    },
    //控制表单规则
    validateRules: {
        id:[
            { type: Number,  message: "ID必须是数字"},
            { required: true, message: "不能为空"}
        ],
        name:[
            { type: String,  message: "姓名应当是文本", Trigger: "blur"},
            { min: 2, max: 8, message: "长度为2~8", Trigger: "blur"}
        ]
    },
    // 表格数据模型， 表格中的数据根据这个模型中的数据来显示
    tableDatas: []
})

//导出信息
const exportInfo = () => {
    // 将数据写入表格中
    const data = XLSX.utils.json_to_sheet(pageVar.tableDatas);
    // 创建工作簿
    const wb = XLSX.utils.book_new();
    // 将工作表放入工作簿中
    XLSX.utils.book_append_sheet(wb, data, "data");
    // 生成文件并下载
    XLSX.writeFile(wb, "学生信息表.xlsx");
}
//新注册
const registryInfo = () => {
    resetInfo()  //复位表单模型  现在打开的表单对话框就是空数据的
    pageVar.dialogVisible = true
    pageVar.isUpdate = false
}

const deleteRow = async (index) =>{
    // 通过表格中的数据和index获取指定表格列中的id
    let tmp = pageVar.tableDatas[index];
    await proxy.$axios.delete(`${proxy.servCtx}/studentList/${tmp.id}`).then(() => {
        ElMessage("删除成功")
        curOperatorIndex = index
        // 在json源数据中执行删除操作后， 也删除tableDatas中的数据
        pageVar.tableDatas.splice(index,1)   //数组操作
    })
}
const updateRow = (index) => {
    pageVar.dialogVisible = true
    pageVar.isUpdate = true
    // 将选定row的信息传递给表单对话框中， 等待用户修改   而且这里是引用传递， 也就是说studentInfo中的数据的修改会影响到tableInfo中的数据
    // pageVar.studentInfo = pageVar.tableDatas[index]
    curOperatorIndex = index
    pageVar.studentInfo = Object.assign({}, pageVar.tableDatas[index]);     // 执行拷贝
}
const resetForm = (formRef) => {
    formRef.value.resetFields() //复位
}
//async: 同步   提交数据
const submitForm = async () => {
    await ruleFormRef.value.validate((isValid) => {  //验证
        if(isValid){ //验证通过
            console.log("提交数据")
            if(pageVar.isUpdate){  // 如果是更新数据
                updateInfo()
            }else{  // 如果是插入数据
                insertInfo()
            }
            // 执行操作后关闭对话框
            pageVar.dialogVisible=false
        }else{
            ElMessage("验证不通过");
        }
    })
}

const insertInfo = () => {
    proxy.$axios.post(`${proxy.servCtx}/studentList`, pageVar.studentInfo).then((res) => {
        pageVar.tableDatas.push(res.data)  // 将数据插入到表格数据模型中
        // 清楚表单数据和状态
        ruleFormRef.value.resetFields()
        ElMessage("保存成功")
    })
}
const updateInfo = () => {
    proxy.$axios.patch(`${proxy.servCtx}/studentList/${pageVar.studentInfo.id}`,
        pageVar.studentInfo).then(() => {
        pageVar.tableDatas[curOperatorIndex] = Object.assign({}, pageVar.studentInfo);  //拷贝
        ElMessage("修改成功")
    })
}

// 重置表单中的内容
const resetInfo = () => {
    pageVar.studentInfo.id = ""
    pageVar.studentInfo.date= ''
    pageVar.studentInfo.name= ''
    pageVar.studentInfo.state= ''
    pageVar.studentInfo.city = ''
    pageVar.studentInfo.address = ''
}


// 查询数据  以五页为节
const queryInfo = (pageNum) => {
    proxy.$axios.get(`${proxy.servCtx}/studentList`, {
        params:{
            _start: (pageNum - 1) * 5,
            _limit: 5
        }
    }).then((res) => {
        pageVar.tableDatas = res.data
    })
}

//初始加载
onMounted(() => {
    queryInfo(1)

})
</script>

<style scoped>
.toolbar{
    margin-right: 20px;
}

#student-container > div{
    display: flex;
    justify-content: space-between;
}
</style>