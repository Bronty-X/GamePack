const gameDetailView = {
    props:[
        'title',
        'description',
        'thumbnailPath',
        'imgsrc'
    ],
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
    },
    template:`
    <div class="game-detail-overlay" @click="clickOverlay($event)">
        <div class="game-detail">
            <div class="close-detail-button" @click="closeDetailView()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </div>
            <img class="game-detail-img" :src="thumbnailPath">
            <div class="game-description-container">
                <h3 class="game-detail-title">{{title}}</h3>
                <p class="game-detail-description">
                    {{description}}
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