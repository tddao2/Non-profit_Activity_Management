<template>           <!--A bootstrap navbar to create menu router link-->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="/"><h2>Bread of Life</h2></a>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/application">Join Events</router-link>          <!--For Participants-->
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Event Actions
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/CreateEvent">Create events</router-link>      <!--For PROJECT MANAGER-->
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/ViewEvent">View events</router-link>        <!--For PROJECT MANAGER-->
                  </li>
              </ul>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/attendees">Attendees</router-link>             <!--For PROJECT MANAGER-->
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/tracking">Event Tracking</router-link>         <!--For SUPERVISOR-->
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/Summary">Event Summary</router-link>           <!--For SUPERVISOR-->
            </li>
          </ul>
        </div>
    </div>
  </nav>
</template>