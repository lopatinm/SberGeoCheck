<?php

namespace app\modules\v1\controllers;

use app\modules\v1\models\Placemark;
use Yii;
use yii\data\ActiveDataProvider;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\helpers\ArrayHelper;
use yii\rest\ActiveController;

use yii\web\ForbiddenHttpException;

class PlacemarkController extends ActiveController
{
    public $modelClass = 'app\modules\v1\models\Placemark';

    public function behaviors()
    {
        $behaviors = ArrayHelper::merge(parent::behaviors(), [
            'corsFilter' => [
                'class' => Cors::className(),
            ],
        ]);
        $behaviors['authenticator']['class'] = HttpBearerAuth::className();
        $behaviors['authenticator']['only'] = ['create', 'update', 'delete'];

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
        $model = new Placemark;
        $activeData = new ActiveDataProvider([
            'query' => $model::find()->orderBy("id DESC"),
            'pagination' => [
                'defaultPageSize' => -1,
                'pageSizeLimit' => -1,
            ],
        ]);
        return $activeData;

    }
}