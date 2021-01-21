<template>
  <div style="padding: 10px; background-color: #fff;">
    <div class="qaline">
      <div class="qatitle">Type of bet</div>
      <div class="qacontent">
        You can choose to bet on "Colors" or "Numbers"
        <br />
        Colors contains <b style="color: #f60;">Red</b>,
        <b style="color: #07c15f;">Green</b>,
        <b style="color: #f25cfb;">Violet</b>
        <br />
        Numbers contains "0","1","2","3","4","5","6","7","8","9"
      </div>
    </div>
    <div class="qaline">
      <div class="qatitle">Bet amount</div>
      <div class="qacontent">
        Unit price is <b>₹10.00</b>
        <br />
        Bet amount is the selected quantity multiplied by unit price
      </div>
    </div>
    <div class="qaline">
      <div class="qatitle">Service charge</div>
      <div class="qacontent">
        If youspend 100 rupees to trade,after deducting 2 rupees service fee Your contract amount is 98 rupees
      </div>
    </div>
    <div class="qaline">
      <div class="qatitle">Won money</div>
      <div class="qacontent">
        Each period of the game will have a result number
        <br />
        - Guess number correctly get <b>9 TIMES</b> reward <br>
        If the result is the same as the number you selected, you wii get ₹98*9=882 rupees.<br>
        - Even numbers correspond to <b style="color: #f60;">Red</b> get
        <b>DOUBLE</b> reward
        <br />
        If the result shows 1,3,7,9,you will get ₹98*2=₹196 rupees.<br>
        - Odd numbers correspond to <b style="color: #07c15f;">Green</b> get
        <b>DOUBLE</b> reward
        <br />
        If the result shows 2,4,6,8,you will get ₹98*2=₹196 rupees. <br>
        <b>DOUBLE</b> reward
        <br />
        - Moreover 0/5 correspond to <b style="color: #f25cfb;">Violet</b> get
        <b>4.5 TIMES</b> reward A bonus of <b>1.5 TIMES</b> for
        <span style="color: #f60;">Red</span> or
        <span style="color: #07c15f;">Green</span> bets also<br>
        - Moreover 0 or 5 correspond to <b style="color: #f25cfb;">Violet</b> get <b>4.5 TIMES</b> <br>
        If the result shows 0 or 5,you will get ₹98*4.5)=₹441 rupees. <br>
        If the shows 5, you will get ₹98*1.5=₹147 rupees. <br>
        If the shows 0, you will get ₹98*1.5)=₹147 rupees. <br>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.qaline {
  line-height: 150%;
}

.qaline .qatitle {
  font-size: 14px;
  color: #95abff;
  font-weight: bolder;
}

.qaline .qacontent {
  font-size: 12px;
  color: #888;
}

b {
  color: #333;
}
</style>
