<script setup lang="ts">

</script>

<template>
  <div class="nav">
    <div class="nav-icon icon-add"/>
    <div class="nav-icon">
      <IconsTrash class="icon-delete"/>
    </div>
  </div>
  <div class="list-items">
    <div class="list-item">
      <div class="list-item-title">
        Heading
      </div>
      <div class="list-item-content">
        <div class="list-item-date">13:18</div>
        <div class="list-item-text">## h2 Heading ### h3 Heading</div>
      </div>
    </div>
    <div class="list-item active">
      <div class="list-item-title">
        Heading
      </div>
      <div class="list-item-content">
        <div class="list-item-date">13:18</div>
        <div class="list-item-text">## h2 Heading ### h3 Heading</div>
      </div>
    </div>
    <div class="list-item">
      <div class="list-item-title">
        Heading
      </div>
      <div class="list-item-content">
        <div class="list-item-date">13:18</div>
        <div class="list-item-text">## h2 Heading ### h3 Heading</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav {
  display: flex;
  padding: 0 20px;
  gap: 20px;

  &-icon {
    width: 32px;
    height: 32px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}

.list {
  &-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
  }
  &-item {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 20px;
    position: relative;
    cursor: pointer;
    gap: 8px;
    transition: .3s;
    &:first-child {
      &:before {
        display: none;
      }
    }
    &.active {
      background-color: #ffd69c;
      &:before {
        display: none;
      }
      + .list-item {
        &:before {
          display: none;
        }
      }
    }
    &:hover {
      background-color: #ffd69c;
    }
    &:before {
      content: '';
      position: absolute;
      top: -10px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: rgba(34, 34, 34, 0.2);
    }

    &-title {
      font-weight: 600;
      font-size: 22px;
    }
    &-content {
      display: flex;
      gap: 16px;

    }
    &-date {
      font-size: 18px;
    }
    &-text {
      font-size: 18px;
      color: rgba(124, 124, 124, 0.7);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.icon {
  &-add {
    &:hover {
      &:before, &:after {
        background-color: green;
      }
    }

    &:before, &:after {
      content: '';
      position: absolute;
      width: 20px;
      height: 2px;
      background-color: #ccc;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: .3s;
    }

    &:after {
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }

  &-delete {
    width: 26px;
    height: 26px;
  }
}
</style>
