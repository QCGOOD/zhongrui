<template>
  <div class="want-sign">
    <div class="top white">
      <div class="img">
        <img :src="`${imgCut}${model.iconUrl}${cutParam1}`" alt="">
      </div>
      <div class="info">
        <p class="title">{{model.title}}</p>
        <div class="time-price">
          <p class="time">
            开始时间：{{model.startTime | formatDate}}
          </p>
          <p class="price" v-if="model.isEnableFee">
            <span>￥</span>
            {{totalAmount | formatPrice}}
          </p>
          <p class="price" v-else>免费</p>
        </div>
      </div>
    </div>
    <div class="number" v-if="model.activitySignSetting && model.activitySignSetting.singleNum < 1">
      <span>数量</span>
      <inline-x-number width="50px" v-model="sign.num" :min="1" :max="model.activitySignSetting.singleNum" ></inline-x-number>
    </div>
    <!-- <div class="discount" v-if="model.isEnableFee">
      <group gutter="0">
        <cell title="选择优惠券" @click.native="onChooseCoupon"></cell>
        <cell v-if="coupon">
          <p slot="title">
            <span class="condition">{{coupon.title}}</span>
          </p>
        </cell>
      </group>
    </div> -->
    <div class="sign-up white">
      <p class="title vux-1px-b">填写参加人信息</p>
      <div class="input-box">
        <!-- 1:文本,2:单选,3:多选,4:时间选择,5:图片，6音乐 ；7。文件 -->
        <label class="item" v-for="(item, i) in signDataList" v-if="item.type == 1" :key="i">
          <!-- <i class="iconfont icon-wode1"></i> -->
          <input v-model="item.value" type="text" :placeholder="`${item.name}${item.isRequired?'（必填）':''}`">
        </label>
        <group v-else-if="item.type == 2">
          <popup-radio :title="item.name" :options="item.options" v-model="item.value" placeholder="请选择"></popup-radio>
        </group>
        <group :title="item.name" v-else-if="item.type == 3" >
           <checklist label-position="left" :options="item.options" v-model="item.value"></checklist>
        </group>
        <!-- <input type="file" accept> -->
      </div>
    </div>
    <div style="font-size: 14px;position: fixed;bottom: 52px;width: 100%;text-align: center;background: #f2f2f2;padding: 8px 0;color:#9c9c9c">
      <check-icon type="plain" :value.sync="checke"></check-icon>
      <span @click="show=true">活动协议服务</span>
    </div>
    <div class="btn-pay" v-if="model.isEnableFee && !model.activitySignSetting.isEnableAudit">
      <div class="price">总计 <span>{{ totalAmount | formatPrice }}</span></div>
      <div class="pay" @click="save()">微信支付</div>
    </div>
    <div class="btn" @click="save()" v-else>
      确定
    </div>
    <div v-transfer-dom>
      <popup v-model="couponWrap" height="400px">
        <div class="popup2">
          <coupon-item v-for="coupon in couponList" :key="coupon.id" :item="coupon" @click="onChooseCoupon"></coupon-item>
        </div>
      </popup>
    </div>
     <div v-transfer-dom>
    <x-dialog v-model="show" class="dialog-demo">
      <div style="height: 400px;overflow: auto;font-size: 14px;padding: 10px;">
        甲方： <br>
        身份证号码： <br>
        广州中睿企业管理有限公司<br>
          活动服务协议 <br>
        乙方：广州中睿企业管理有限公司    <br>
        营业执照号：91440101MA5AP0YWXH <br>
        经营许可证编号：S0412018000592（1-1） <br>
        地址：广州市越秀区广州大道中富力新天地50楼<br>
        甲乙双方本着精诚合作，平等互利的原则，经友好协商，根据中华人民共和国法律 及有关规定，就有关甲方委托乙方组织活动的有关事宜，达成如下协议，并共同遵 守。   <br>
        一、活动路线及时间 <br>
        1、活动路线：<br>
        以线上该活动介绍的版本为准。<br>
        2、活动时间：<br>
        3、出发日期：<br>
        二、活动费用及付款方式 <br>
        1、活动费用：团费以线上活动公开的价格为准，团费包含内容以线上线路介 绍中列明的【费用包含】详情为准，线上线路介绍中注明的【费用不含】的费用由甲方 自行承担。 <br>
        2、付款方式:甲方在线上报名时一次性付清团费。 <br>
        三、双方的权利与义务 <br>
        1、甲方的权利与义务 <br>
        （1）甲方有权知悉其购买的产品和服务的真实情况。 <br>
        （2）甲方有权要求乙方按照合同和行程表的内容和标准，兑现行程的产品和 服务，在行程中对乙方提供的服务进行监督、评分、投诉。 <br>
        （3）甲方有权自主选择产品和服务，有权拒绝乙方未经事先协商一致的转团、 拼团行为和购物及另行付费项目安排，有权拒绝领队强迫或者变相强迫的购物及另 行付费项目安排。 <br>
        （4）甲方在人身和财产安全遇有危险时，有请求救助和保护的权利；在合法权益 受到损害时向有关部门投诉或要求乙方协助索赔的权利。 <br>
        （5）甲方应按时支付活动费用。如甲方逾期付款，乙方有权取消此次活动并保留 追究甲方由此产生的损失的权利。 <br>
        （6）甲方在线上报名或者填写各种材料时，应提供准确的个人信息，对填写信息<br>
        的真实性、有效性负责。限制民事行为能力人单独出行的，须由监护人书面同意。甲方 在乙方在线报名系统提交的报名信息，作为本合同的组成部分。 <br>
        （7）若甲方参与者为老人、未成年人、孕妇或有心脏病、高血压、呼吸系统等疾 病病史，建议征得医生意见，或经家属同意，或由家属陪伴为妥。甲方在本协议委托事 项以外所产生的费用，由甲方自行承担。 <br>
        （8）甲方已明确知晓户外部分活动（包括但不限于潜水、游泳、高速摩托艇、攀<br>
        岩、蹦极、滑雪、高原旅行等）为高危娱乐，在充分考虑到自身条件后才自愿参加，并 自愿承担因参加上述活动而发生任何事故可能造成的任何后果。 <br>
        （9）甲方在签订本服务协议后，因自身原因而未能实际实现所委托部分或全部服 务事项时，将自行承担责任。 <br>
        （10）甲方应遵守国家的法律法规、尊重当地的风俗习惯、文化传统和宗教信仰、 遵守文明行为规范。 <br>
        （11）甲方应妥善保管自己的行李物品，尤其是现金和贵重物品。非乙方过错导致 甲方财产损失的，乙方不承担经济赔偿责任，但应予以甲方必要的协助。 <br>
        （12）甲方应对国家应对重大突发事件暂时限制活动的措施及有关部门或者乙 方采取的安全防范和应急处置措施，应当予以配合。 <br>
        （13）甲方在行程中或解决纠纷时，应采取适当措施防止损失扩大，不损害当地居 民合法权益，不干扰他人，不损害经营者和从业人员的合法权益，不采取 拒绝登机（车、船）、拖延行程或者脱团等过度维权行为。 <br>
        （14）除本服务协议约定由乙方提供的服务内容外，其余部分由甲方自行负责。 <br>
        （15）甲方应遵守合同约定，配合领队安排在本次活动中的安全事项和 其他合理要求，不得擅自单独行动，否则由此造成的费用、风险和责任由甲方自行承担。 <br>
        2、乙方的权利与义务 <br>
        （1）乙方有权核实甲方提供的相关信息资料，并根据甲方的身体状况等因素决定 是否接纳甲方报名参团。 <br>
        （2）乙方有权拒绝甲方超出合同约定的要求。 <br>
        （3）乙方因未达到约定人数或遇到重大天气气候气候变化、传染疾病、政治原因不能出团，乙方需提前通知甲方，双方可以解除合同 或延期活动。 <br>
        （4）乙方有权在团队遇紧急情况时采取应急处置措施并要求甲方配合。 <br>
        （5）乙方有权要求甲方健康、文明，劝阻和制止甲方违法和违反社会公德的 行为。 <br>
        （6）乙方需按时为甲方提供本协议约定的服务事项。 <br>
        （7）乙方应按照合同的约定履行义务，不得擅自变更行程安排，不得降低服 务标准。景点自然景观可能因为季节气候、天气变化等因素而与活动介绍、图片不 完全一致，甲方应认可并理解此为合理情况，不以此作为服务质量的评判依据。 <br>
        （8）乙方应保障行程中所使用的交通用车具备正规运营资质。 <br>
        （9）乙方应确保线路报价不属于“不合理的低价”。 <br>
        （10）乙方承诺行程中无任何强制性消费，无任何指定购物点（作为景点的开放 式商业街、老街、老城不视为购物环节）。如应甲方要求需加入购物活动和另行付费 项目的，必须签订补充协议，经双方签字确认。协议对购物活动的次数、购物场 所名称、停留的最长时间、主要商品信息等和对另行付费项目的次数、名称、时 间、地点、价格等作出真实、详细的说明。购物活动和另行付费项目安排不得与 约定的行程冲突。 <br>
        （11）乙方禁止乙方领队在行程中进行推销、接受回扣等任何侵害甲方利益的行 为。 <br>
        （12）出团前应将有关出团注意事项明确告知甲方。 <br>
        （13）乙方需为甲方购买个人意外保险。在签订本协议时，乙方对甲方委托 事项中涉及的目的地、日期、项目、安全须知等已作如实、详细说明和报价。 <br>
        （14）乙方对可能危及甲方人身、财产安全的项目和须注意的问题，应当事前向 甲方作出真实说明和明确警示，并采取防止危害发生的措施；在甲方人身、财产权益 受到损害时，应采取保护和救助措施。 <br>
        （15）乙方对甲方参与者所有个人信息资料保密。<br>
        四、合同的变更 <br>
          1、甲乙双方协商一致，可以变更本合同约定的内容，由此增加的费用及 给对方造成的损失，由变更提出方承担，由此减少的费用，乙方应当退还甲方。<br>
          2、因未达到成团最低人数不能出团的，乙方可以延期出团，因此增加的费用由甲 方承担，减少的费用退还甲方，必要时可以重新签订合同。乙方延期活动后，甲方 如决定不参加延期后的本活动，可在延期操作后 3 天内退出活动，团费全款退回给甲方，甲方退出活动即视为本合同解除，如活动延期操作后 3 天内甲方未退出活动，则 视为甲方接受新的活动时间安排。 <br>
        五、合同的解除 <br>
        1、在行程结束前，甲方可以书面等形式解除合同（相关法律、行政法规另有规定 的除外）。解约的发生时间及涉及到的团费扣除比例以线上活动线路介绍的费用说明为 准，如扣除比例不足以弥补乙方损失的，应当按实际发生的损失扣除团费比例，但最高额不应当超过费用总额。 <br>
        2、因未达到成团最低人数不能成团时，甲方不同意延期的，甲、乙双方均可以解 除合同，乙方向甲方退回已收取的全部费用。 <br>
        3、甲方有以下情形之一的，乙方可以解除合同（相关法律、行政法规另有规定的 除外）： <br>
        (1)患有传染病等疾病，可能危害其他人的健康和安全的； <br>
        (2)携带危害公共安全的物品且不同意交有关部门处理的； <br>
        (3)从事违法或者违反社会公德的活动的； <br>
        (4)从事严重影响其他人权益的活动，且不听劝阻、不能制止的；<br>
        (5)法律规定的其他情形。 <br>
        乙方因上述情形解除合同的，应通知甲方，由甲方承担违约责任。解约的发生时间及涉及到的团费扣除比例以线上活动线路介绍的费用说明为准。<br>
        4、甲方未按约定时间到达约定集合出发地点，也未能在出发中途加入团队的，<br>
        视为甲方解除合同，按本合同违约责任第 7 条相关约定处理。<br>
        5、甲方在行程中未经乙方同意、没有合理理由擅自脱团的，视为甲方解除合同，并承担违约责任，甲方不得要求乙方退还费用，给乙方造成经济损失的，还应当承 担相应经济赔偿责任。 <br>
        6、因不可抗力或者乙方及其履行辅助人已尽合理注意义务仍不能避免的事件，造 成合同不能继续履行的，甲、乙双方均可以解除合同；造成合同不能完全履行而甲方又 不同意乙方变更请求的，可以解除合同；合同解除后，乙方应当在扣除已向地接或者履行 辅助人支付且不可退还的费用后，将余款退还给甲方。 <br>
        7、行程中解除合同的，乙方应当协助甲方返回出发地或者甲方指定的合理地<br>
        点。由于乙方或者履行辅助人的原因导致合同解除的，返程费用由乙方承担。由于甲方的原因导致合同解除的，返程费用由甲方承担。 <br>
        六、违约责任 <br>
        1、乙方需提前告知甲方活动未成团取消或延期活动，甲方如不同意延期出团而解除合同的，乙方向甲方退还已收取的全部费用。 <br>
        2、除因不可抗力或者乙方及其履行辅助人已尽合理注意义务仍不能避免的事件外， 行程中乙方未按合同约定提供服务或未经甲方同意调整行程，造成项目减少、时间缩短或者标准降低的，应当依法承担继续履行、采取补救措施或者赔偿损失的责任，并按《旅行社服务质量赔偿标准》赔偿甲方；造成费用减少的，减少部分还应退回 甲方，造成费用增加的，增加部分由乙方承担。 <br>
        3、乙方在行程中甩团（是指乙方并非因不可抗力导致违反合同约定中止对甲方提供住宿、交通、用餐、游览等服务的行为）的，甲方可以解除合同，乙方应当向甲方退还已交费用，赔偿甲方回程所需合理的交通费、食宿费及其他实际损失，并向甲方支付费用 20%的违约金；造成甲方人身损害、滞留等严重后果的，甲方还可以要求乙方支付费用总额 1 倍以上 3 倍以下的赔偿金。 <br>
        4、由于地接社、履行辅助人的原因导致违约的，或者地接社及其从业人员在行程中 安排购物活动、另行付费项目的，由乙方承担责任；由于公共交通经营者的原因造成 甲方人身损害、财产损失依法应承担责任的，乙方应当协助甲方向公共交通经营者索赔。 <br>
        5、如因乙方原因导致活动不能按上文合同服务条款执行，须事先与甲方联系，说 明原因及解决方案，并自愿承担活动实际造成的损失。 <br>
        6、甲方如不能按合同规定付款期支付乙方合同款项，须提前与乙方联系，并承担 相应的滞纳金(按合同总金额的0.5%收取)；如甲方逾期付款，乙方有权取消此次活动并 保留追究甲方由此产生的损失的权利。 <br>
        7、甲方提出解除合同，解约的发生时间及涉及到的团费扣除比例以线上活动线路 介绍的费用说明为准，如扣除比例不足以弥补乙方损失的，应当按实际发生的损失扣 除团费比例，但最高额不应当超过费用总额。 <br>
        8、甲方有下列情况之一，后果自行承担，给乙方造成损失的，还应当承担相应的 赔偿责任： <br>
        （1）不听从乙方或其领队的劝告和提示而影响团队行程的； <br>
        （2）违反安全警示规定的； <br>
        （3）超出本合同约定的内容进行个人活动的。 <br>
        （4）对国家应对重大突发事件暂时限制此活动的措施、安全防范和应急处置措 施不予配合的； <br>
        9、因甲方自身过错，出现酗酒闹事、扰乱社会秩序、侵害他人权益以及造成自身 损害的行为，由此产生的法律责任和经济赔偿由甲方承担，乙方应积极予以协助。 <br>
        10、自由活动期间以及行程中途经的休息站、加油站、公共卫生间、开放式商业街 等休息和方便时间，甲方购物为个人自主行为，由此产生的纠纷或造成的损失与乙方无 关，乙方不承担责任。 <br>
        11、甲方在人身和财产安全遇有危险时得到救助和保护的，应当支付应由个人承担 的费用。 <br>
        12、由于甲方自身原因或第三方侵害等不可归责于乙方的原因导致合同不能履 行或者不能按约定履行，或者造成甲方人身损害、财产损失的，乙方不承担赔偿责任； 但因乙方不履行协助义务致使甲方人身、财产权益损失扩大的，应当就扩大的损失承担 赔偿责任。 <br>
        13、甲、乙双方出现纠纷时，均应积极采取措施防止损失扩大，否则违约方应当就 扩大的损失承担相应的责任。 <br>
        七、不可抗力 <br>
        在签订本服务协议后，因一切非乙方原因造成甲方行程时间变更的如不适合举行<br>
        活动的天气(包括但不限于中雨、大雨及以上恶劣天气)、景区关闭、自然灾难、火 灾、战争、全民运动或类似程度的无法预见之军事行动、征收、占领、通过管制、暴 动、社会骚乱、以及当地地方国内及国外主管机关之合法决定等不可抗力不能履行本 服务事项时，乙方应及时向对方通报不能履行或不能完全履行的理由，以减轻可能给 对方造成的损失，在取得有关机构证明以后，允许延期履行、部分履行或者中止履行 合同。活动因不可抗力造成延期或取消，如已造成实际损失的，由甲乙双方协商解 决。 <br>
        八、免责条款 <br>
        1、甲方在委托乙方服务事项时需向乙方承诺自己的身体不存在任何诸如：心脏 病、精神病、肺结核、哮喘病、支气管炎、肝炎、肺炎、癫痫、重大关节或骨骼疾病 等不适合出游的疾患和身体损伤。甲方对自身的疾患损伤情况需事先以书面形式告知 乙方，甲方若因隐瞒其疾患损伤所造成的后果由甲方自负；非乙方原因，甲方在出游 中因其疾患或行为不当而引起一切损伤及后果由甲方自负。 <br>
        2、乙方在活动质量问题发生之前已采取以下措施的，应减轻或免除责任： <br>
        （1）对活动质量和安全状况（包括出游中的参与者酗酒闹事、扰乱社会秩序等行 为的危害性）已给予充分说明、提醒、劝诫、警告或或事先说明。 <br>
        （2）所发生的违约问题是非故意、非过失或无法预知或已采取了预防性措施。 <br>
        （3）质量问题的发生是全部或部分由于赔偿请求人自身的过错。 <br>
        （4）质量问题发生后，乙方积极、及时采取了应付措施。<br>
        九、争议解决 <br>
        本合同履行过程中产生争议的，双方可友好协商解决，协商不成的，可向乙方辖 区内的人民法院起诉。 <br>
        十、其他条款 <br>
        1、本合同没有规定的事项，或本合同内容需要调整的，若乙方已经有了相关规<br>
        定，则按照乙方规定执行，若乙方没有相关规定，则由乙方以通知形式或双方签订补 充协议进行完善或调整，通知、补充协议、扫描件与本合同书具有同等法律效力。 <br>
        2、签订本合同时，双方确认的合同附件为本合同不可分割的组成部分，与本合同 具有同等法律效力。 <br>
        3、本合同经甲乙双方盖章、签字后生效，一式两份，双方各执一份。 <br>
        甲方(签章)：                     乙方(签章)：广州中睿企业管理有限公司 <br>
        签约代表：                      签约代表：          <br>
        联系方式：                       联系方式：     <br>
        日期：                          日期：    <br>
      </div>
      <div style="line-height:40px;height: 40px;background: #eee;" @click="show=false">
        关闭
      </div>
    </x-dialog>
  </div>
  </div>
</template>

<script>
import {
  Group,
  CheckIcon,
  Cell,
  InlineXNumber,
  Radio,
  Checklist,
  Popup,
  TransferDom,
  PopupRadio,
  XDialog
} from "vux";
import CouponItem from "@/components/Common/couponItem";

export default {
  directives: {
    TransferDom
  },
  components: {
    XDialog,
    CheckIcon,
    Group,
    Cell,
    InlineXNumber,
    Radio,
    Checklist,
    Popup,
    CouponItem,
    PopupRadio
  },
  data() {
    return {
      show: false,
      checke: true,
      sign: {
        sourceId: "",
        sourceType: "",
        shareCode: "",
        shareMemberId: "",
        num: 1
      },
      signDataList: [],
      model: {},
      couponWrap: false,
      couponList: [],
      coupon: null
    };
  },
  created() {
    this.apiGetActiveOne(this.$route.query.id);
  },
  computed: {
    userInfo() {
      return this.$store.state.user;
    },
    totalAmount() {
      if (!this.model.isEnableFee) {
        return 0;
      }
      if (this.coupon) {
        return (
          this.model.activityFee.price * this.sign.num - this.coupon.amount
        );
      } else {
        return this.model.activityFee.price * this.sign.num;
      }
    }
  },
  methods: {
    // 查询活动
    apiGetActiveOne(id) {
      this.$http.get("/activity/get", { id }).then(res => {
        this.model = res.data.data;
        if (this.model.isEnableFee) {
          this.apiGetConpon({
            activityId: id,
            activityCategoryId: this.model.categoryId,
            activityOrderAmount: this.model.activityFee.price
          });
          this.sign.sourceId = this.model.id;
        }
        // 格式化表单数据
        this.signDataList = this.model.signDataSettingList.map(res => {
          res.value = "";
          res.settingId = res.id;
          if (res.fieldName == "name") {
            res.value = this.userInfo.name || "";
          }
          if (res.fieldName == "mobile") {
            res.value = this.userInfo.mobile || "";
          }
          if (res.fieldName == "company") {
            res.value = this.userInfo.company || "";
          }
          if (res.fieldName == "position") {
            res.value = this.userInfo.position || "";
          }
          if (res.options) {
            res.options = res.options.split("_");
          }
          if (res.type == 3) {
            res.value = [];
          }
          return res;
        });
      });
      // 判断类型操作
    },
    // 保存订单
    apiSaveOrder(query) {
      query.sign.sourceId = query.id;
      this.$vux.loading.show({ text: "正在提交" });
      this.$http
        .json("/activitySignTemp/sign", query)
        .then(res => {
          if (this.model.activitySignSetting.isEnableAudit) {
            // 开启审核后
            this.jumpPage("/order/success?type=1");
          } else if (this.model.isEnableFee) {
            // 要给钱
            this.apiPayOrder(res.data.message);
          } else {
            // 完美无暇
            this.jumpPage("/order/success?type=0");
          }
        })
        .catch(err => {
          this.toast(err.data.message);
        })
        .finally(() => {
          this.$vux.loading.hide();
        });
    },
    // 支付订单
    apiPayOrder(orderId, orderType = 2) {
      this.$http
        .post("/pay", {
          orderId,
          orderType,
          couponId: this.coupon ? this.coupon.id : "",
          payReturnUrl: `http://x.wego168.com/zhongrui/mobile/#/order/success?type=0`
        })
        .then(res => {
          location.href = `http://x.wego168.com/zhongrui/pay.html?token=${
            res.data.data.id
          }`;
        });
    },
    apiGetConpon(model) {
      this.$http.get("/coupon/activity", model).then(res => {
        this.couponList = res.data.data;
      });
    },
    save() {
      if(!this.checke) {
        this.$vux.toast.text("请勾选活动服务");
        return
      }
      // 撸两个新的空间
      let sign = JSON.parse(JSON.stringify(this.sign));
      sign.price = this.totalAmount;
      let signDataList = JSON.parse(JSON.stringify(this.signDataList));
      // 验证一下数据
      for (let i = 0; i < signDataList.length; i++) {
        if (
          signDataList[i].fieldName == "mobile" &&
          !/^1[0-9]{10}$/.test(signDataList[i].value)
        ) {
          this.$vux.toast.text("手机格式不正确");
          return;
        }
        if (signDataList[i].isRequired && signDataList[i].value == "") {
          this.$vux.toast.text(`请填写${signDataList[i].name}`);
          return;
        }
        if (
          signDataList[i].type == 3 &&
          typeof signDataList[i].value != "sting"
        ) {
          signDataList[i].value = signDataList[i].value.join("_");
        }
      }
      this.apiSaveOrder({ ...this.$route.query, sign, signDataList });
    },
    onChooseCoupon(item) {
      if (this.couponWrap) {
        this.couponWrap = false;
        this.coupon = item;
      } else {
        this.couponWrap = true;
      }
    },
    jumpPage(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style lang="less">
.want-sign {
  margin-bottom: 14vw;
  .top {
    display: flex;
    padding: 3vw 4vw;
    .img {
      width: 28vw;
      height: 20vw;
      border-radius: 2vw;
      overflow: hidden;
      flex-shrink: 0;
      margin-right: 3vw;
      position: relative;
      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .info {
      flex: 1;
      .title {
        font-size: 3.8vw;
      }
      .time-price {
        margin-top: 5vw;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        line-height: 1;
        .time {
          font-size: 3.4vw;
          color: @gray-color;
          span {
            color: @yellow-color;
          }
        }
        .price {
          font-size: 3.8vw;
          span {
            font-size: 3vw;
            margin-right: -1vw;
          }
        }
      }
    }
  }
  .number {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    background: #fff;
    border-top: 1px solid #f2f2f2;
  }
  .discount {
    margin-top: 3vw;
    .title {
      border: 1px solid #bf9f56;
      font-size: 3.5vw;
      padding: 0.5vw 1vw;
      color: #bf9f56;
    }
    .condition {
      color: #5d6266;
    }
  }
  .sign-up {
    margin-top: 3vw;
    .title {
      padding: 3vw 0;
      margin-left: 4vw;
    }
    .input-box {
      padding: 4vw;
      .item {
        padding: 0 3vw;
        margin-bottom: 3.8vw;
        height: 10vw;
        display: block;
        line-height: 10vw;
        background-color: rgb(247, 247, 247);
        i {
          font-size: 4.5vw;
          margin-right: 2vw;
          color: @red-color;
        }
        input {
          outline: none;
          border: 0;
          background-color: rgb(247, 247, 247);
          font-size: 3.8vw;
          width: 100%;
        }
      }
      .weui-cells {
        font-size: 3.8vw;
        background: #f7f7f7;
        color: #757575;
        &::after,
        &::before {
          border-bottom: 0px solid #d9d9d9;
          border-top: 0px solid #d9d9d9;
        }
      }
    }
  }
  .btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 14vw;
    line-height: 14vw;
    background-color: @theme-color;
    color: #fff;
    font-size: 4.6vw;
    text-align: center;
  }
  .btn-pay {
    height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    background: #fff;
    border-top: 1px solid #e4e4e4;
    box-sizing: border-box;
    .price {
      padding-left: 10px;
      font-size: 13px;
      color: #666;
      span {
        font-size: 16px;
        color: #e2513c;
      }
    }
    .pay {
      height: 100%;
      width: 120px;
      line-height: 45px;
      text-align: center;
      font-size: 15px;
      background-color: #62b900;
      color: #fff;
      box-sizing: border-box;
    }
  }
}
</style>
