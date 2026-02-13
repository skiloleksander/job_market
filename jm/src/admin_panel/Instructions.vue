<template>
    <section class="instructions">
        <section class="admin-instruction-block">
            <h3>How to Edit and Publish</h3>
            <ol>
                <li>Select tab "Edit and Publish"</li>
                <li>Enter all information about vacancy</li>
                <li>Click button "Publish"</li>
            </ol>
            <p>All information about that vacancy will store in database,and after your publish that vacancy that vacancy will be active</p>
        </section>
        <section class="admin-instruction-block">
            <h3>About tab with all vacancyes</h3>
            <p>In tab "Vacancies" you will see all vacancies with "active" and "disactive" state</p>
            <p>You can easely change state of vacancy by clicking button "Activate/Disactivate" at the bottom of vacancy</p>
            <p>Also you can delete vacancy by clicking button "Delete"</p>
            <p>You can filtring vacancies by clicking button at the top and search vacancies by their names</p>
        </section>
        <section class="admin-instruction-block">
            <h3>Sended vacancies</h3>
            <p>In the tab "Sended vacancies" you will see all vacancies that users send to you,they have state "sended" and will not show in vacancies tab and in the jobs page</p>
            <p>By clicking button "Move to vacancies" you will change state of that vacancy to "disactive" and publish after</p>
            <p>You can delete that vacancy by clicking button "Delete"</p>
        </section>
        </section>
</template>

<style scoped>
    .instructions {
        display: flex;
        flex-direction: column;
    }
    .admin-instruction-block {
        border-bottom: 1px solid #fff;
        margin-bottom: 20px;

        h3 {
            font-size: 26px;
            margin-top: 0;
        }
    }
</style>