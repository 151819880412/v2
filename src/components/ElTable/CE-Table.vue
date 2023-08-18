<template>
  <div class="CETable">
    <el-row class="container">
      <el-col class="tableTop">
        <i class="el-icon-s-order"></i>
        <span> 数据列表</span>
        <div style="float: right; display:flex">
          <slot name="MainTableBtn">
            <el-button type="primary" @click="add">新增</el-button>
          </slot>
          <slot name="tableBtn"></slot>

          <!-- 刷新 -->
          <el-tooltip effect="dark" content="刷新" placement="top">
            <div class="tableConfig" @click="refreshTable">
              <i class="el-icon-refresh"></i>
            </div>
          </el-tooltip>

          <!-- 列设置 -->
          <el-tooltip effect="dark" content="列设置" placement="top">
            <div class="tableConfig">
              <el-popover placement="top" :width="330" trigger="click" @show="popoverShow">
                <div ref="columnListRef">
                  <div v-for="item in tableColumns" :key="item.ceId" style="position:relative">
                    <div style="display:flex;align-items:center;width:100%">
                      <i class="el-icon-rank table-column-drag-icon"></i>
                      <el-checkbox style="margin:0 5px" v-model="item.ceShow" />
                      <span>{{ item.label }}</span>
                    </div>
                    <span style="position: absolute;right: 0px;top: 10px;">
                      <el-tooltip class="box-item" effect="dark" content="固定到左侧" placement="bottom">
                        <i class="el-icon-back fixed-left" @click.prevent="fixeds(item, 'left')"
                          :class="{ 'active': item.fixed == 'left', disabled: !item.ceShow }"></i>
                      </el-tooltip>
                      <el-tooltip class="box-item" effect="dark" content="固定到右侧" placement="bottom">
                        <i class="el-icon-right fixed-right" @click.prevent="fixeds(item, 'right')"
                          :class="{ 'active': item.fixed == 'right', disabled: !item.ceShow }"></i>
                      </el-tooltip>
                    </span>
                  </div>
                </div>
                <template slot="reference">
                  <i class="el-icon-setting"></i>
                </template>
              </el-popover>
            </div>
          </el-tooltip>

        </div>
      </el-col>
      <!-- 表格 -->
      <el-col>
        <el-skeleton :rows="5" animated :loading="loading" :throttle="500">
          <el-table v-bind="ceTable" style="width: 100%">
            <el-table-column label="序号" type="index" width="70" align="center"></el-table-column>

            <template v-for="item in tableColumns">
              <template v-if="item.ceShow">
                <template v-if="item.type === 'operation'">
                  <el-table-column :label="item.label" :width="item.width" :align="item.align" :key="item.ceId">
                    <template slot-scope="scope">
                      <el-dropdown>
                        <el-button type="primary">
                          操作<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <template slot="dropdown">
                          <el-dropdown-menu>
                            <div v-for="item2 in item.operationBtn" :key="item2.label">
                              <el-dropdown-item v-if="showDropdownItems(item2.ceShow, scope.row)"
                                @click.native="dropdownItemsFn(item2.operationMethod, scope.row)">{{ item2.label
                                }}</el-dropdown-item>
                            </div>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </template>
                  </el-table-column>
                </template>
                <template v-else-if="item.type == 'selection'">
                  <el-table-column type="selection" v-bind="item" :key="item.ceId"></el-table-column>
                </template>
                <template v-else>
                  <el-table-column v-bind="item" :key="item.ceId">
                    <template slot-scope="scope">{{ formatter(item, scope.row) }}</template>
                  </el-table-column>
                </template>
              </template>
            </template>

          </el-table>
        </el-skeleton>
      </el-col>
      <!-- 分页 -->
      <el-col style="padding: 12px" v-show="page.total >= 0">
        <el-skeleton :rows="5" animated :loading="loading" :throttle="500">
          <el-pagination :currentPage.sync="page.currentPage" :page-size="page.pageSize"
            :page-sizes="[10, 20, 30, 40, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="page.total"
            @size-change="handleSizeChange" @current-change="handleCurrentChange" style="float: right" />
        </el-skeleton>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Sortable from 'sortablejs';
import { getUuid } from '@/utils/index';
import { StateMap } from '@/enums/stateEnum';
import EventBus from '@/utils/EventBus';

export default {
  name: 'CETable',
  props: {
    searchFn: {
      type: Function,
      required: true,
    },
    searchData: {
      type: Object,
      required: false,
      default: () => {
        return {};
      },
    },
  },
  inject: ['Pctx'],
  data() {
    return {
      tableColumns: [],
      ceTable: {
        data: [],
      },
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      loading: true,
      sortable: null,
    };
  },
  methods: {
    add() {
      try {
        this.$emit('add');
      } catch (error) {
        this.$message.error('缺少add方法');
        console.error('缺少add方法');
      }
    },
    fixeds(row, type) {
      if (!row.ceShow) return;
      this.tableColumns.forEach(item => {
        if (item.label === row.label) {
          item.fixed = item.fixed === type ? false : type;
        }
      });
    },
    popoverShow() {
      this.$nextTick(() => {
        const columnListEl = this.$refs.columnListRef;
        if (!columnListEl) return;

        // Drag and drop sort
        this.sortable = Sortable.create(columnListEl, {
          animation: 500,
          delay: 400,
          delayOnTouchOnly: true,
          handle: '.table-column-drag-icon',
          onEnd: evt => {
            const { oldIndex, newIndex } = evt;
            if (oldIndex === newIndex) return;

            let oldList = this.tableColumns[oldIndex];// oldIndex旧的排序
            let newList = this.tableColumns[newIndex];// newIndex新的排序
            // 需要传递的参数
            this.sort = {
              currId: oldList.id,
              newId: newList.id,
              currSort: oldList.sort,
              newSort: newList.sort
            };
            this.$emit('sortList', this.sort);// 触发父元素的发送请求，顺便把参数传过去

          },
        });
      });
    },
    initCETable(data) {
      const column = [];
      if (data.column) {
        data.column.forEach(item => {
          column.push(item);
        });
      }
      this.tableColumns = column;

      this.ceTable = Object.assign({}, data, { column });
    },
    async initTableData(currentPage, pageSize, searchData) {
      this.searchFormDataCopy = {
        currentPage,
        pageSize,
        searchData: JSON.parse(JSON.stringify(searchData)),
      };
      if (this.searchFn) {
        const { data } = await this.searchFn(currentPage, pageSize, searchData);
        this.page.total = data.total;
        this.loading = false;
        this.ceTable.data = data.results;
      }
    },
    refreshTable() {
      this.initTableData(1, 10, this.searchData);
    },
    formatter(item, row) {
      if (item.ceFormatter) {
        return StateMap.get(row[item.ceFormatter]);
      }
      return row[item.prop];
    },
    handleSizeChange(pageSize) {
      if (pageSize * (this.page.currentPage - 1) > this.page.total) return;
      this.page.pageSize = pageSize;
      this.initTableData(this.page.currentPage, this.page.pageSize, this.searchData);
    },
    handleCurrentChange(currentPage) {
      this.page.currentPage = currentPage;
      this.initTableData(this.page.currentPage, this.page.pageSize, this.searchData);
    },
    dropdownItemsFn(operationMethod, row) {
      if (!this.Pctx) {
        this.$message.warning("父级没有注入ctx");
        return;
      }
      try {
        this.Pctx[operationMethod](row);
      } catch (error) {
        console.error(error);
      }
    },
    showDropdownItems(condition, row) {
      if (typeof condition === "string") {
        return eval(condition);
      }
      return condition;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initTableData(1, 10, this.searchData);
    });
    EventBus.$on('searchTableData', async (data)=>{
      await this.initTableData(1, 10, data);
    });

  },
  beforeDestroy() {
    EventBus.$off('searchTableData');
  },
};
</script>

<style scoped>
:root {
  --el-color-primary: 'red';
}

.container {
  padding: 12px;
  width: 100%;
}

.tableTop {
  height: 32px;
  margin-bottom: 12px;
}

.tableConfig {
  margin-left: 6px;
  height: 100%;
  cursor: pointer;
  width: 1.3rem;
  height: 1.3rem;
  font-size: 1.3rem;
}

.table-column-drag-icon {
  margin: 0 5px;
  cursor: move;
}

.fixed-left,
.fixed-right {
  margin-right: 12px;
  cursor: pointer;
}

.fixed-left:hover,
.fixed-right:hover {
  color: var(--el-color-primary);
}

.active {
  color: var(--el-color-primary);
}

.disabled {
  cursor: not-allowed;
}
</style>