const gameDetailView = {
    methods:{
        closeDetailView(){
            console.log('close detail view');
            this.$emit('close-detail-view');
        },
        clickOverlay(event){
            if(event.target.classList.contains('game-detail-overlay')){
                this.closeDetailView();
            }
        }
    }
    ,
    template:`
    <div class="game-detail-overlay" @click="clickOverlay($event)">
        <div class="game-detail">
            <img class="game-detail-img" src="img/NumHuntMenuScreen.png">
            <div class="game-description-container">
                <h3 class="game-detail-title">NumHunt</h3>
                <p class="game-detail-description">
                    NumHuntは、数字を使ったオンラインカードゲーム。最大4人で対戦できるこのゲームは、プレイヤーは、数字を駆使し「ボーナスナンバー」の獲得を目指す。
                </p>
                <div class="game-spec-table">
                    <div class="game-spec-table-row">
                        <div>ジャンル</div>
                        <div>カードゲーム</div>
                    </div>
                    <div class="game-spec-table-row">
                        <div>プラットフォーム</div>
                        <div>Web</div>
                    </div>
                    <div class="game-spec-table-row">
                        <div>開発期間</div>
                        <div>3ヶ月</div>
                    </div>
                    <div class="game-spec-table-row">
                        <div>開発言語</div>
                        <div>JavaScript</div>
                    </div>
                    <div class="game-spec-table-row">
                        <div>開発環境</div>
                        <div>Unity</div>
                    </div>
                    <div class="game-spec-table-row">
                        <div>開発環境</div>
                        <div>Unity</div>
                    </div>
                    <div class="game-spec-table-row">
                        <div>開発環境</div>
                        <div>Unity</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}