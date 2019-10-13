<template>
    <f7-page :page-content="false">
        <f7-navbar title="Static Tabs" back-link="Back">
            <f7-nav-right>
                <f7-button raised panel-open="left">Menu</f7-button>
            </f7-nav-right>
        </f7-navbar>
        <f7-toolbar tabbar bottom>
            <f7-link tab-link="#tab-1" tab-link-active>Tab 1</f7-link>
            <f7-link tab-link="#tab-2">Tab 2</f7-link>
            <f7-link tab-link="#tab-3">Tab 3</f7-link>
        </f7-toolbar>
        <f7-tabs>
            <f7-tab id="tab-1" class="page-content" tab-active>
                <f7-block>
                    <p>Tab 1 content</p>
                    ...
                </f7-block>
            </f7-tab>
            <f7-tab id="tab-2" class="page-content">
                <f7-block>
                    <p>Tab 2 content</p>
                    ...
                </f7-block>
            </f7-tab>
            <f7-tab id="tab-3" class="page-content">
                <f7-block>
                    <p>Tab 3 content</p>
                    ...
                </f7-block>
            </f7-tab>
        </f7-tabs>
    </f7-page>
</template>

<script>
export default {}
</script>
