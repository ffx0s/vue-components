<template>
  <div v-if="!loading" class="v-c4">
    <div class="v-c4__header v-c4_between">
      <div class="v-c4__header-shopname" :class="loadingClass">
        {{ item.shopname }}
      </div>
      <div class="v-color-warning" :class="loadingClass">{{ item.status }}</div>
    </div>
    <div class="v-c4__content">
      <ul class="v-c4__list">
        <li class="v-c4_row">
          <div
            class="v-c4__item-image"
            :class="loadingClass"
            :style="imageStyle"
          />
          <div class="v-c4__item-info v-c4_between" :class="loadingClass">
            <div class="v-c4__item-title">{{ item.title }}</div>
            <div class="v-c4__item-price">
              <div>{{ item.price }}</div>
              <div class="v-c4__item-number">x{{ item.number }}</div>
            </div>
          </div>
        </li>
      </ul>
      <div class="v-c4__total">
        <span :class="loadingClass">
          <span class="v-c4__item-number">共{{ item.number }}件商品</span>
          &nbsp;合计: ￥{{ item.price }}
        </span>
      </div>
    </div>
    <div class="v-c4__footer v-c4_between v-bd-top">
      <span class="v-color-error">{{ item.message }}</span>
      <div class="v-c4__footer-actions"><slot name="btns" /></div>
    </div>
  </div>
  <div v-else class="v-c4 v-skeleton--animate">
    <div class="v-c4__header v-c4_between">
      <div class="v-c4__header-shopname v-skeleton">
        {{ item.shopname }}
      </div>
      <div class="v-color-warning v-skeleton">{{ item.status }}</div>
    </div>
    <div class="v-c4__content">
      <ul class="v-c4__list">
        <li class="v-c4_row">
          <div class="v-c4__item-image v-skeleton" />
          <div class="v-c4__item-info v-c4_between v-skeleton"></div>
        </li>
      </ul>
      <div class="v-c4__total">
        <span class="v-skeleton">
          <span class="v-c4__item-number">共{{ item.number }}件商品</span>
          &nbsp;合计: ￥{{ item.price }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'v-card-c4',
  props: {
    item: {
      type: Object,
      default: () => {
        return {
          image: '',
          title: '',
          price: '',
          number: '',
          status: '____________',
          shopname: '_______________',
          message: ''
        }
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    imageStyle() {
      if (!this.item.image) return {}
      return {
        backgroundImage: 'url(' + this.item.image + ')',
        backgroundSize: 'cover'
      }
    },
    loadingClass() {
      return this.loading ? 'v-skeleton' : ''
    }
  }
}
</script>

<style lang="postcss">
.v-c4 {
  font-size: 12px;
  line-height: 18px;
  background-color: white;
  border-radius: 4px;
}
.v-c4__header {
  padding: 10px 10px 0;
}
.v-c4__content {
  padding: 10px;
}
.v-c4__list {
  list-style: none;
  padding: 0;
  margin: 0;
  & li {
    margin-bottom: 10px;
  }
}
.v-c4__item-image {
  width: 90px;
  height: 90px;
  border-radius: 5px;
  background-position: center;
  background-repeat: no-repeat;
}
.v-c4__item-info {
  flex: 1;
  margin-left: 10px;
}
.v-c4__item-title {
  flex: 1;
  margin-bottom: 5px;
}
.v-c4__item-price {
  margin-left: 10px;
  text-align: right;
}
.v-c4__item-number {
  color: var(--textRegular);
}

.v-c4__footer {
  padding: 10px;
  align-items: center;
}

.v-c4__total {
  text-align: right;
}

.v-c4_row {
  display: flex;
  flex-direction: row;
}
.v-c4_between {
  display: flex;
  justify-content: space-between;
}
</style>
