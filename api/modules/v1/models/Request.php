<?php
Namespace app\modules\v1\models;
use http\Exception;
use Yii;
use yii\base\InvalidConfigException;
use yii\db\ActiveRecord;
use yii\web\IdentityInterface;
use yii\web\HttpException;

/**
 * This is the model class for table "requests".
 *
 * @property int $id
 * @property string $user_id
 * @property string $longitude
 * @property string $latitude
 * @property string $comment
 *
 */
class Request extends ActiveRecord {

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'requests';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'longitude', 'latitude'], 'required'],
            [['longitude','latitude'], 'string', 'max' => 255],
            [['comment'], 'string'],
            [['user_id'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'longitude' => 'Longitude',
            'latitude' => 'Latitude',
            'comment' => 'Comment',
        ];
    }
}