<template>
  <div class="footer-inner">
    <ul class="footer-group-list">
      <li>
        <label class="text1">CUSTOMER CENTER</label>
        <label class="text2">1234-5678</label>
        <label class="text3">Weekday 10:00~17:00</label>
        <label class="text4">(Lunch 12:00~13:00)</label>
        <label class="text5">주말 및 공휴일은 휴무입니다.</label>
      </li>

      <li>
        <ol class="cpol">
          <li>
            법인명 : (주)과일가게&nbsp;&nbsp;|&nbsp;&nbsp;
            대표 : 김형진&nbsp;&nbsp;|&nbsp;&nbsp;
            주소 : (01234) 서울특별시 중구 종로3가
          </li>
          <li>
            사업자등록번호 : 123-45-56789
            [사업자정보확인]&nbsp;&nbsp;|&nbsp;&nbsp;
            통신판매업신고번호 : 제2020-서울종로-12345호
          </li>
          <li>
            개인정보책임자 : 김형진&nbsp;&nbsp;|&nbsp;&nbsp;
            이메일 : hyeongjin1326@gmail.com&nbsp;&nbsp;|&nbsp;&nbsp;
            FAX: 02-1234-5678
          </li>
          <li>Copyright ⓒ 2020 (주)과일가게 ALL Right Reserved.</li>
          <li>
            <!-- <img src="./images/ssl.png" class="icos" /> -->
            <p>이미지1</p>
            <!-- <img src="./images/payico.png" class="icos" /> -->
            <p>이미지2</p>
          </li>
        </ol>
      </li>

      <li>
        <div class="cpview" id="cpview">
          <span>빈칸1</span>
          <span>빈칸2</span>
          <span>빈칸3</span>
        </div>
        <div class="cpdiv" id="cpdiv">
          <span class="leftspan">전용회원</span>
          <!-- <span><img src="./images/up.png" class="cpimg" /></span> -->
        </div>
      </li>
    </ul>
    
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-inner{
  /* background-color: #683505; */
  max-width: 1064px;
  margin: auto;
  padding: 0;
  box-sizing: border-box;
}
.footer-group-list{
  color: #8b95a1;
  color: var(--grey500);
  font-size: 13px;
  font-style: normal;
  line-height: 20px;
  white-space: pre-wrap;
}
</style>
