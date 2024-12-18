<template>
    <div>
        <div class="alert alert-danger" role="alert" style="text-align: center;">
            <h2>
                <Icon icon="maki:police"/>Unauthorized Access<Icon icon="ph:hand-duotone"/>
            </h2>
        </div>
    </div>
</template>
<script>
    import {Icon} from '@iconify/vue'
    export default{
        name:'UnauthorizedView',
        components:{Icon},
    }
</script>