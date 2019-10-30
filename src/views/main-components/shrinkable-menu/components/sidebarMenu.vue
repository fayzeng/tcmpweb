<style lang="less">
    @import '../styles/menu.less';
</style>
<template>
  <Menu ref="sideMenu" :active-name="$route.name" :open-names="openNames" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList">
            <MenuItem v-if="item.children.length<=1" :name="item.name" :key="'menuitem_' + item.title">
                <Icon :type="item.icon" :size="iconSize" :key="'menuicon_' + item.title"></Icon>
                <span class="layout-text" :key="'menuname_' + item.title">{{ item.title }}</span>
            </MenuItem>
            <Submenu v-if="item.children.length > 1" :name="item.title" :key="'subitem_'+item.title">
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ item.title }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem v-if='child.children.length==0'  :name="child.name?child.name:''" :key="'childitem_'+child.title">
                        <Icon :type="child.icon" :size="iconSize" :key="'childicon_'+child.title"></Icon>
                        <span class="layout-text" :key="'childname_'+child.title">{{ child.title }}</span>
                    </MenuItem>
                    <Submenu v-else :name="child.title" :key="'subitem_'+child.title">
                        <template slot="title">
                            <Icon :type="child.icon"   :size="iconSize"></Icon>
                            <span class="layout-text">{{ child.title }}</span>
                        </template>
                        <template v-for="son in child.children">
                            <MenuItem  :name="son.name ? son.name:''"  :key="'childitem_'+son.title">
                                <Icon :type="son.icon" :size="iconSize" :key="'childicon_'+son.title"></Icon>
                                <span  style="font-size:13px;"  class="layout-text" :key="'childname_'+son.title">{{ son.title }}</span>
                            </MenuItem>
                        </template>
                    </Submenu>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenu',
    props: {
        menuList: Array,
        iconSize: Number,
        menuTheme: {
            type: String,
            default: 'dark'
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        changeMenu (active) {
            this.$emit('on-change', active);
        }
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }

};
</script>
