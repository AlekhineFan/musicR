<template>
  <h1>Welcome</h1>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <router-link to="/artists" class="navbar-brand">Artists</router-link>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/artist-details" class="nav-link"
          >Artist details</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/add" class="nav-link">Add Artist</router-link>
      </li>
    </div>
  </nav>

  <div class="container mt-3">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style></style>
