<template>
  <div class="app--spacing">
    <div
      class="image-viewer__item"
      v-for="(item, i) in items"
      :key="i"
      :id="'image-viewer__item-' + i"
    >
      <h4>#{{ i + 1 }} {{ item.title }}</h4>
      <ul>
        <li v-for="(img, index) in item.images" :key="index">
          <img
            @click="showViewer(i, index)"
            :src="img.thumbnail"
            :alt="img.alt"
          />
        </li>
      </ul>
    </div>
    <ImageViewer v-transfer-dom :images="images" ref="viewer">
      <template v-slot:toolbar="{ index, item }">
        <div class="v-image-viewer__topbar">
          <span>{{ index + 1 }}/{{ images.length }}</span>
        </div>
        <div class="image-viewer__toolbar">{{ item.alt }}</div>
      </template>
    </ImageViewer>
  </div>
</template>

<script>
import ImageViewer from 'muvc/imageViewer'

export default {
  components: {
    ImageViewer
  },
  data() {
    return {
      images: [],
      items: [
        {
          title: 'Cat',
          images: [
            {
              alt: 'CatYoung Animal',
              thumbnail:
                'https://static.webfed.cn/o_1d9u7gc8c8ip1u35n111i46ehce.jpg?imageView2/0/w/300',
              src: 'https://static.webfed.cn/o_1d9u7gc8c8ip1u35n111i46ehce.jpg',
              w: 1280,
              h: 781
            },
            {
              alt: 'Kitty Cat Kitten',
              thumbnail:
                'https://static.webfed.cn/o_1d9u7gc8cedal1q1nhuc8g243d.jpg?imageView2/0/w/300',
              src: 'https://static.webfed.cn/o_1d9u7gc8cedal1q1nhuc8g243d.jpg',
              w: 1280,
              h: 853
            },
            {
              alt: 'Cat Kitten',
              thumbnail:
                'https://static.webfed.cn/o_1d9uckkvb1e8m1dd71ir2e95krh.jpg?imageView2/0/w/300',
              src: 'https://static.webfed.cn/o_1d9uckkvb1e8m1dd71ir2e95krh.jpg',
              w: 384,
              h: 384
            }
          ]
        },
        {
          title: 'People',
          images: [
            {
              alt: 'Woman Beautiful Girl',
              thumbnail:
                'https://static.webfed.cn/o_1d9u7gc8cnpnke014pnu1g25ch.jpg?imageView2/0/w/300',
              src: 'https://static.webfed.cn/o_1d9u7gc8cnpnke014pnu1g25ch.jpg',
              w: 1280,
              h: 853
            },
            {
              alt: 'Soldier Military',
              thumbnail:
                'https://static.webfed.cn/o_1d9u7gc8ceef1kip1f6kg0jb67g.jpg?imageView2/0/w/300',
              src: 'https://static.webfed.cn/o_1d9u7gc8ceef1kip1f6kg0jb67g.jpg',
              w: 1280,
              h: 818
            }
          ]
        },
        {
          title: 'Sky',
          images: [
            {
              alt: 'Direction Sunlight Clouds Sky',
              thumbnail:
                'https://static.webfed.cn/o_1d9u7gc8c1ke3jrfliekhu1h3gf.jpg?imageView2/0/w/300',
              src: 'https://static.webfed.cn/o_1d9u7gc8c1ke3jrfliekhu1h3gf.jpg',
              w: 1024,
              h: 1280
            },
            {
              alt: 'Bule Clouds Sky',
              thumbnail:
                'https://static.webfed.cn/o_1d9u8era42691t556jgo5u1h4d9.jpg?imageView2/0/w/300',
              src: 'https://static.webfed.cn/o_1d9u8era42691t556jgo5u1h4d9.jpg',
              w: 1280,
              h: 1280
            }
          ]
        },
        {
          title: 'Flowers',
          images: [
            {
              alt: 'flowers pink',
              thumbnail:
                'https://static.webfed.cn/o_1dcbamjfsee0152kobcojq1gh49.jpg?imageView2/0/w/300',
              src: 'https://static.webfed.cn/o_1dcbamjfsee0152kobcojq1gh49.jpg',
              w: 1280,
              h: 853
            }
          ]
        }
      ]
    }
  },
  methods: {
    showViewer(itemIndex, imageIndex) {
      this.images = this.items[itemIndex].images
      this.$nextTick(() => {
        this.$refs.viewer.show({
          index: imageIndex,
          selector: `#image-viewer__item-${itemIndex} img`
        })
      })
    }
  }
}
</script>

<style lang="postcss">
.image-viewer__item {
  & ul {
    list-style: none;
    margin: 0 -5px;
    padding: 0;
  }
  & li {
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
    display: inline-block;
    box-sizing: border-box;
    width: 33.33333%;
    & img {
      width: 100%;
      vertical-align: middle;
    }
  }
}
.image-viewer__toolbar {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
  width: 100%;
  height: 100px;
  color: var(--lightGray);
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}
</style>
