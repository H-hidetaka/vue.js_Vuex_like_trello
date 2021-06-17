<template>
  <form class="addlist" @submit.prevent="addList">
    <!-- v-modelにtitleを定義することで、dataプロパティとバインドさせます。 データをバインドさせる(データバインディング)とは、scriptで定義したdataプロパティをテンプレートでもリアルタイムにそのまま共有（紐付け）できるような仕組みですv-modelはv-onとv-bindの2つの機能を持ち合わせています。-->
    <input v-model="title"
      type="text"
      class="text-input"
      placeholder="Add new list"
      @foucusin="startEditing"
      @focusout="finishEditing"
    >
    <!-- v-ifディレクティブに、フォームが活性の時（isEditing）と、テキストが入力された時(titleExists)を指定しました。なので、どちらかがtrueの時だけボタンが表示されます。 -->
    <button type="submit"
            class="add-button"
            v-if="isEditing || titleExists">
    Add
    </button>
  </form>
</template>

<script>
export default {
  data: function() {
    return {
      title: '',
      isEditing: false,
    }
  },
  // 簡単な値を返す場合はcomputed, 条件によっては違う値を返すなどの複雑な処理はwatch
  computed: {
    classList() {
      const classList = ['addlist']

      if(this.isEditing) {
        classList.push('active')
      }
      if(this.titleExists) {
        classList.push('addable')
      }
      return classList
    },
    titleExists() {
      return this.title.length > 0
    }
  },
  methods: {
    addList: function() {
      this.$store.dispatch('addlist', { title: this.title })
      this.title = ''
    },
    startEditing(){
      this.isEditing = true
    },
    finishEditing() {
      this.isEditing = false
    },
  }
}
</script>
