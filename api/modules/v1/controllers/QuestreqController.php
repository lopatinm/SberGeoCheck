<?php

namespace app\modules\v1\controllers;

use app\modules\v1\models\Questreq;
use app\modules\v1\models\User;
use app\modules\v1\models\Quest;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\rest\ActiveController;

use yii\web\ForbiddenHttpException;

class QuestreqController extends ActiveController
{
    public $modelClass = 'app\modules\v1\models\Questreq';

    public function behaviors()
    {
        $behaviors = ArrayHelper::merge(parent::behaviors(), [
            'corsFilter' => [
                'class' => Cors::className(),
            ],
        ]);
        $behaviors['authenticator']['class'] = HttpBearerAuth::className();
        $behaviors['authenticator']['only'] = ['create', 'update', 'delete', 'index', 'getreq'];

        return $behaviors;
    }

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['index'], $actions['getreq']);
        return $actions;
    }

    public function actionIndex()
    {
        if (isset(Yii::$app->authManager->getRolesByUser(Yii::$app->user->identity['id'])['manager'])){
            $model = new Questreq;
            $activeData = new ActiveDataProvider([
                'query' => $model::find()->orderBy("id DESC"),
                'pagination' => [
                    'defaultPageSize' => -1,
                    'pageSizeLimit' => -1,
                ],
            ]);
        }else{
            $model = new Questreq;
            $activeData = new ActiveDataProvider([
                'query' => $model::find()->where(array('user_id' => Yii::$app->user->identity['id']))->orderBy("id DESC"),
                'pagination' => [
                    'defaultPageSize' => -1,
                    'pageSizeLimit' => -1,
                ],
            ]);
        }
        return $activeData;

    }

    public function actionGetreq()
    {
        $response = [];

        $questreqs = Questreq::find()->indexBy('id')->all();
        foreach($questreqs as $questreq){
                $user =  User::findOne(['id' => $questreq->user_id]);
                $quest = Quest::findOne(['id' => $questreq->quest_id]);
                $response[] = ['user'=>$user, 'quest'=> $quest, 'questreq'=> $questreq];
        }

        return $response;
    }

}