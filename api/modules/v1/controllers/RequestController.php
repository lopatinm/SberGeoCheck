<?php

namespace app\modules\v1\controllers;

use app\modules\v1\models\Request;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\rest\ActiveController;

use yii\web\ForbiddenHttpException;

class RequestController extends ActiveController
{
    public $modelClass = 'app\modules\v1\models\Request';

    public function behaviors()
    {
        $behaviors = ArrayHelper::merge(parent::behaviors(), [
            'corsFilter' => [
                'class' => Cors::className(),
            ],
        ]);
        $behaviors['authenticator']['class'] = HttpBearerAuth::className();
        $behaviors['authenticator']['only'] = ['create', 'update', 'delete', 'index'];

        return $behaviors;
    }

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['index']);
        return $actions;
    }

    public function actionIndex()
    {
        if (isset(Yii::$app->authManager->getRolesByUser(Yii::$app->user->identity['id'])['manager'])){
            $model = new Request;
            $activeData = new ActiveDataProvider([
                'query' => $model::find()->orderBy("id DESC"),
                'pagination' => [
                    'defaultPageSize' => -1,
                    'pageSizeLimit' => -1,
                ],
            ]);
        }else{
            $model = new Request;
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
}