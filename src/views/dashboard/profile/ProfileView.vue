<script setup lang="ts">
import ProfileTab from "@/components/pages/dashboard/profile/ProfileView/ProfileTab.vue"
import ChangePasswordTab from "@/components/pages/dashboard/profile/ProfileView/ChangePasswordTab.vue"
</script>

<template>
  <TabView>
    <TabPanel header="Profile">
      <ProfileTab />
    </TabPanel>
    <TabPanel header="Change Password">
      <ChangePasswordTab />
    </TabPanel>
  </TabView>
</template>
