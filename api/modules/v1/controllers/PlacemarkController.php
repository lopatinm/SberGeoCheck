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
        $behaviors['authenticator']['only'] = ['create', 'update', 'delete', 'accept', 'remove', 'index'];

        return $behaviors;
    }

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['index'], $actions['accept'], $actions['remove']);
        return $actions;
    }

    public function actionIndex()
    {
        if (isset(Yii::$app->authManager->getRolesByUser(Yii::$app->user->identity['id'])['manager'])){
            $model = new Placemark;
            $activeData = new ActiveDataProvider([
                'query' => $model::find()->orderBy("id DESC"),
                'pagination' => [
                    'defaultPageSize' => -1,
                    'pageSizeLimit' => -1,
                ],
            ]);
        }else{
            $model = new Placemark;
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

    /**
     * @return array
     * @throws ForbiddenHttpException
     * @throws \yii\base\InvalidConfigException
     */
    public function actionAccept()
    {
        if (!isset(Yii::$app->authManager->getRolesByUser(Yii::$app->user->identity['id'])['manager']))
            throw new ForbiddenHttpException(sprintf('Access is denied'));
        return Placemark::markAccept(Yii::$app->getRequest()->getBodyParams());
    }

    /**
     * @return array
     * @throws ForbiddenHttpException
     * @throws \yii\base\InvalidConfigException
     */
    public function actionRemove()
    {
        if (!isset(Yii::$app->authManager->getRolesByUser(Yii::$app->user->identity['id'])['manager']))
            throw new ForbiddenHttpException(sprintf('Access is denied'));
        return Placemark::markRemove(Yii::$app->getRequest()->getBodyParams());
    }
}