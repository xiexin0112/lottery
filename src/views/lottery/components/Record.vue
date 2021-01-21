<template>
  <table>
    <tr class="title">
      <td>Period</td>
      <td>Selected</td>
      <td>Price</td>
      <td>Win</td>
    </tr>
    <tr class="lotrecord" v-for="(item, index) in list" :key="index">
      <td class="hd period">
        <div class="ball fist-ball" :class="getColor(item.result)">{{ item.result }}</div>
        <div class="num">{{ item.period }}</div>
      </td>
      <td v-if="item.selected" class="balls">
        <div v-for="(ball, i) in item.selected.split(',')" :key="i" class="ball" :class="getSelectColor(ball, item.result)">{{ ball }}</div>
      </td>
      <td v-else >-</td>
      <td>{{ toNum(item.price || '-') }}</td>
      <td>{{ toNum(item.win || '-') }}</td>
    </tr>
  </table>
</template>

<script lang="ts">
import { toRefs } from 'vue'
import { balls } from '../const'

interface Props {
  betList: {};
}

export default {
  props: {
    betList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup (props: Props) {
    const list = toRefs(props).betList

    const getColor = function (val) {
      let color = ''
      balls.some(item => {
        if (item.val === Number(val).toString()) {
          color = item.color
          return true
        }
      })
      return color
    }

    const getSelectColor = function (val, result) {
      const resultColor = getColor(result)
      if (Number(val) === Number(result)) {
        return resultColor
      }
      let color = ''
      balls.some(item => {
        if (item.color === resultColor && ['V', 'G', 'R'].includes(val) && val === item.val) {
          color = item.color
          return true
        }
      })
      return color
    }

    return {
      list,
      getColor,
      getSelectColor
    }
  }
}
</script>

<style lang='less' scoped>
  .title {
    font-size: 12px;
    color: #999;
  }

  td {
    font-size: 12px;
    text-align: center;
    padding: 5px 5px;
    border-left: 0;
    border: 1px solid #f1f1f1;
  }

  .hd {
    text-align: left;
  }

  .ball {
    display: block;
    float: left;
    margin: 5px 5px 0 3px;
    font-size: 12px;
    width: 14px;
    height: 14px;
    text-align: center;
    line-height: 1;
    padding: 1px;
    border-radius: 50%;
    border: 1px solid #e1e1e1;
    background-color: #f1f1f1;

    &.red {
      background: #f60;
      color: #fff;
      border: 1px solid #f60;
    }

    &.violet {
      background: #f25cfb;
      color: #fff;
      border: 1px solid #f25cfb;
    }

    &.green {
      background: #07c15f;
      color: #fff;
      border: 1px solid #07c15f;
    }
  }

  .num {
    color: #10aeff;
  }

  .period {
    min-width: 110px;
    width: 120px;
  }

  .balls {
    width: 90px;
    text-align: center;

    .ball {
      margin: 0.05rem 0.1rem;
    }
  }

</style>
