<template>
  <div class="footer-container">
    <div class="footer-inner">
      <ul class="footer-group-list footer-group-list--horizontal">
        <li>
          <ol>
            <span class="text-title-style">과일가게</span>
          </ol>
          <ol>
            <span class="text-icon-style">대표&nbsp;</span>
            <span class="text-detail-style">김대표</span>
          </ol>
          <ol>
            <span class="text-icon-style">주소&nbsp;</span>
            <span class="text-detail-style">(01234) 서울특별시 중구 종로3가</span>
          </ol>
          <ol>
            <span class="text-icon-style">사업자등록번호&nbsp;</span>
            <span class="text-detail-style">123-45-56789</span>
          </ol>
          <ol>
            <span class="text-icon-style">통신판매업신고번호&nbsp;</span>
            <span class="text-detail-style">제2023-서울종로-12345호</span>
          </ol>
          <ol>
            <span class="text-icon-style">개인정보책임자&nbsp;</span>
            <span class="text-detail-style">김대표</span>
          </ol>
        </li>

        <li>
          <ol>
            <span class="text-title-style">고객센터</span>
          </ol>
          <ol>
            <v-icon size="small">mdi-phone-classic</v-icon>
            <span class="text-icon-style">&nbsp;&nbsp;전화&nbsp;</span>
            <span class="text-detail-style">1234-5678</span>
          </ol>
          <ol>
            <v-icon size="small">mdi-calendar-blank</v-icon>
            <span class="text-icon-style">&nbsp;&nbsp;평일&nbsp;</span>
            <span class="text-detail-style">10:00~17:00</span>
          </ol>
          <ol>
            <span class="text-icon-style no-icon">&nbsp;&nbsp;(점심시간&nbsp;</span>
            <span class="text-detail-style">12:00~13:00<b>)</b></span>
          </ol>
          <ol>
            <span class="text-detail-style no-icon">&nbsp;&nbsp;주말 및 공휴일은 휴무입니다.</span>
          </ol>
          <ol>
            <v-icon size="small">mdi-email-outline</v-icon>
            <span class="text-icon-style">&nbsp;&nbsp;이메일&nbsp;</span>
            <span class="text-detail-style">email@gmail.com</span>
          </ol>
          <ol>
            <v-icon size="small">mdi-fax</v-icon>
            <span class="text-icon-style">&nbsp;&nbsp;FAX&nbsp;</span>
            <span class="text-detail-style">02-1234-5678</span>
          </ol>
        </li>

        <li>
          <ol>
            <span class="text-title-style">안내</span>
          </ol>
          <ol>
            <span class="text-detail-style">공지사항</span>
          </ol>
          <ol>
            <span class="text-detail-style">자주 묻는 질문</span>
          </ol>
        </li>
      </ul>
      <ul>
        <ol>
          <span style="font-size: 13px;">
            Copyright ⓒ 2023 (주)과일가게 ALL Right Reserved.
          </span>
        </ol>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-container {
  background-color: #683505;
  width: 100%;
  margin: auto;
  padding: 20px
}
.footer-inner {
  max-width: 1064px;
  margin: auto;
  padding: 0;
  box-sizing: content-box;
  color: aliceblue;
}
.footer-group-list {
  color: var(--grey500);
  font-size: 13px;
  font-style: normal;
  line-height: 20px;
  white-space: pre-wrap;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.footer-group-list--horizontal li {
  flex-basis: auto;
}
.text-title-style {
  font-weight: bold;
  font-size: large;
  padding-bottom: 5px;
}
.text-icon-style {
  font-weight: bold;
}
.no-icon {
  margin-left: 13px;
}
.text-detail-style {
  font-size: normal;
}
ol {
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
}
ol, ul {
  list-style: none;
}
</style>